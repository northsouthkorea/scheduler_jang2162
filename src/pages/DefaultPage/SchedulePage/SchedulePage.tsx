import MonthlyView from "@/components/MonthlyView/MonthlyView";
import {VIEW_TYPE} from "@/modules/SchedularPageModule";
import SchedulePageContainer, {propType} from "@/pages/DefaultPage/SchedulePage/SchedulePageContainer";
import {ScheduleViewer, TopControl} from "@/pages/DefaultPage/SchedulePage/SchedulerPageStyled";
import moment from "moment";
import React from 'react';

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
        }
        props.setCurDate(d);
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
                    <button onClick={() => props.setViewType(VIEW_TYPE.CALENDAR_DAY)}>DAY</button>
                    <button onClick={() => props.setViewType(VIEW_TYPE.CALENDAR_WEEK)}>WEEK</button>
                    <button onClick={() => props.setViewType(VIEW_TYPE.CALENDAR_MONTH)}>MONTH</button>
                    <button onClick={() => props.setViewType(VIEW_TYPE.CALENDAR_YEAR)}>YEAR</button>
                    <button onClick={() => props.setViewType(VIEW_TYPE.TIMELINE)}>TIMELINE</button>
                </div>
            </TopControl>
            <ScheduleViewer>
                {props.viewType === VIEW_TYPE.CALENDAR_MONTH && <MonthlyView curDate={props.curDate} />}
            </ScheduleViewer>
        </>
    )
};

export default SchedulePageContainer(SchedulePage);
