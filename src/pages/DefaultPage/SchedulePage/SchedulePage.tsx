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
import {Transition, TransitionGroup} from 'react-transition-group';

const SchedulePage = (props: propType) => {
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
                    <button onClick={() => props.setViewType(VIEW_TYPE.CALENDAR_DAY, moment().valueOf())}>DAY</button>
                    <button onClick={() => props.setViewType(VIEW_TYPE.CALENDAR_WEEK, moment().valueOf())}>WEEK</button>
                    <button onClick={() => props.setViewType(VIEW_TYPE.CALENDAR_MONTH, moment().valueOf())}>MONTH</button>
                    <button onClick={() => props.setViewType(VIEW_TYPE.CALENDAR_YEAR, moment().valueOf())}>YEAR</button>
                    <button onClick={() => props.setViewType(VIEW_TYPE.TIMELINE, moment().valueOf())}>TIMELINE</button>
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
