import DailyView from '@/components/DailyView/DailyView';
import MonthlyView from '@/components/MonthlyView/MonthlyView';
import WeeklyView from '@/components/WeeklyView/WeeklyView';
import {LAST_CHANGE_FIELD, VIEW_TYPE} from '@/modules/SchedularPageModule';
import SchedulePageContainer, {propType} from '@/pages/DefaultPage/SchedulePage/SchedulePageContainer';
import {ScheduleViewer, TopControl, Wrapper} from '@/pages/DefaultPage/SchedulePage/SchedulerPageStyled';
import {store} from '@/store';
import {TweenMax} from 'gsap';
import moment from 'moment';
import React from 'react';
import {RouteComponentProps} from 'react-router';
import {Transition, TransitionGroup} from 'react-transition-group';


const getViewType2ParamStr = function(vt: VIEW_TYPE): string {
    switch (vt) {
        case VIEW_TYPE.TIMELINE: return 'timeline';
        case VIEW_TYPE.CALENDAR_DAY: return 'daily';
        case VIEW_TYPE.CALENDAR_WEEK: return 'weekly';
        case VIEW_TYPE.CALENDAR_MONTH: return 'monthly';
        case VIEW_TYPE.CALENDAR_YEAR: return 'year';
        default: return '';
    }
}

const SchedulePage = (props: propType & RouteComponentProps) => {
    if (props.location.pathname === '/schedules') {
        props.history.replace(`/schedules/${getViewType2ParamStr(props.viewType)}/${moment(props.curDate).format('YYYYMMDD')}`);
    } else {
        if (props.firstLoad) {
            const viewTypeMap = {
                'timeline': VIEW_TYPE.TIMELINE,
                'daily': VIEW_TYPE.CALENDAR_DAY,
                'weekly': VIEW_TYPE.CALENDAR_WEEK,
                'monthly': VIEW_TYPE.CALENDAR_MONTH,
                'year': VIEW_TYPE.CALENDAR_YEAR,
            } as any;
            const params = props.location.pathname.split('/');
            const viewType = params.length > 2 ? params[2] : '';
            const date = params.length > 3 ? moment(params[3]) : null;
            let needChangeViewTypeParam = false;
            let needChangeCurDateParam = false;

            if (viewType in viewTypeMap) {
                props.setViewType(viewTypeMap[viewType], 0);
            } else {
                needChangeViewTypeParam = true;
            }

            if (date !== null && date.isValid()) {
                props.setCurDate(date, 0);
            } else {
                needChangeCurDateParam = true;
            }

            if (needChangeCurDateParam || needChangeViewTypeParam) {
                props.history.replace(`/schedules/${needChangeViewTypeParam ? getViewType2ParamStr(props.viewType) : params[2]}/${needChangeCurDateParam ? moment(props.curDate).format('YYYYMMDD') : params[3]}`);
            }

        }
    }

    const prevPage = () => {
        const d = moment(props.curDate);
        switch (props.viewType) {
            case VIEW_TYPE.TIMELINE:
                d.hour(d.hour() - 6);
                break;
            case VIEW_TYPE.CALENDAR_DAY:
                d.date(d.date() - 1);
                break;
            case VIEW_TYPE.CALENDAR_WEEK:
                d.date(d.date() - 7);
                break;
            case VIEW_TYPE.CALENDAR_MONTH:
                d.month(d.month() - 1);
                break;
            case VIEW_TYPE.CALENDAR_YEAR:
                d.year(d.year() - 1);
                break;
            default:
                break;
        }
        props.setCurDate(d);
        props.history.replace(`/schedules/${getViewType2ParamStr(props.viewType)}/${d.format('YYYYMMDD')}`);
    };

    const nextPage = () => {
        const d = moment(props.curDate);
        switch (props.viewType) {
            case VIEW_TYPE.TIMELINE:
                d.hour(d.hour() + 6);
                break;
            case VIEW_TYPE.CALENDAR_DAY:
                d.date(d.date() + 1);
                break;
            case VIEW_TYPE.CALENDAR_WEEK:
                d.date(d.date() + 7);
                break;
            case VIEW_TYPE.CALENDAR_MONTH:
                d.month(d.month() + 1);
                break;
            case VIEW_TYPE.CALENDAR_YEAR:
                d.year(d.year() + 1);
                break;
            default:
                break;
        }
        props.setCurDate(d);
        props.history.replace(`/schedules/${getViewType2ParamStr(props.viewType)}/${d.format('YYYYMMDD')}`);
    };

    const setViewType = (viewType: VIEW_TYPE) => {
        props.setViewType(viewType, moment().valueOf());
        props.history.replace(`/schedules/${getViewType2ParamStr(viewType)}/${moment(props.curDate).format('YYYYMMDD')}`);
    };

    const curDate = props.curDate - props.curDate % 86400000;
    const onEnter = (node: HTMLElement) => {
        node.style.zIndex = '2';
        const state = store.getState();
        if (state.schedulerPage.lastChangeField === LAST_CHANGE_FIELD.VIEW_TYPE &&
            state.schedulerPage.lastChangeTimestamp2 - state.schedulerPage.lastChangeTimestamp1 > 500
        ) {

            switch (state.schedulerPage.prevViewType) {
                case VIEW_TYPE.CALENDAR_DAY:
                    if (state.schedulerPage.viewType === VIEW_TYPE.CALENDAR_WEEK) {
                        TweenMax.from(node, 0.3, {opacity: 0});
                    } else {
                        TweenMax.from(node, 0.3, {y: 45, opacity: 0});
                    }
                    break;
                case VIEW_TYPE.CALENDAR_WEEK:
                    if (state.schedulerPage.viewType === VIEW_TYPE.CALENDAR_DAY) {
                        TweenMax.from(node, 0.3, {opacity: 0});
                    } else {
                        TweenMax.from(node, 0.3, {y: 45, opacity: 0});
                    }
                    break;
                // case VIEW_TYPE.CALENDAR_MONTH: break;
                // case VIEW_TYPE.CALENDAR_YEAR: break;
                // case VIEW_TYPE.TIMELINE: break;
                default:
                    TweenMax.from(node, 0.3, {y: 45, opacity: 0});
                    break;

            }
        } else {
            TweenMax.from(node, 0, {});
        }
    };

    const onEntered = (node: HTMLElement) => {
        node.style.zIndex = '3';
    };

    const onExit = (node: HTMLElement) => {
        node.style.zIndex = '1';
    };

    return (
        <>
            <TopControl>
                <div className="item-left">
                    <button onClick={() => prevPage()}>&lt;</button>
                    <button onClick={() => nextPage()}>&gt;</button>
                    <button onClick={() => props.setCurDate(moment())}>TODAY</button>
                    <span>{props.title}</span>
                </div>

                <div className="item-right">
                    <button onClick={() => setViewType(VIEW_TYPE.CALENDAR_DAY)}>DAY</button>
                    <button onClick={() => setViewType(VIEW_TYPE.CALENDAR_WEEK)}>WEEK</button>
                    <button onClick={() => setViewType(VIEW_TYPE.CALENDAR_MONTH)}>MONTH</button>
                    <button onClick={() => setViewType(VIEW_TYPE.CALENDAR_YEAR)}>YEAR</button>
                    <button onClick={() => setViewType(VIEW_TYPE.TIMELINE)}>TIMELINE</button>
                </div>
            </TopControl>
            <ScheduleViewer>
                <TransitionGroup component={null}>
                    <Transition key={props.viewType}
                                in
                                appear
                                timeout={300}
                                onEnter={onEnter}
                                onEntered={onEntered}
                                onExit={onExit}
                    >
                        <Wrapper>
                            {props.viewType === VIEW_TYPE.CALENDAR_MONTH &&
                                <MonthlyView curDate={curDate}/>
                            }
                            {props.viewType === VIEW_TYPE.CALENDAR_WEEK &&
                                <WeeklyView curDate={curDate}/>
                            }
                            {props.viewType === VIEW_TYPE.CALENDAR_DAY &&
                                <DailyView curDate={curDate}/>
                            }
                        </Wrapper>
                    </Transition>
                </TransitionGroup>
            </ScheduleViewer>
        </>
    )
};

export default SchedulePageContainer(SchedulePage);
