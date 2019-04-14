import {Epic} from "@/lib/SimpleEpic";
import {RootState} from "@/store";
import {createActionCreators, createReducerFunction, ImmerReducer} from "immer-reducer";
import moment from 'moment';
import {ofType} from "redux-observable";
import {map} from "rxjs/operators";

export enum VIEW_TYPE {
    CALENDAR_MONTH,
    CALENDAR_WEEK,
    CALENDAR_DAY,
    CALENDAR_YEAR,
    TIMELINE,
}

export interface SchedulerPageState {
    viewType: VIEW_TYPE;
    title: string;
    curDate: number;
    prevDate: number;
}

const now = moment();
const initialState: SchedulerPageState = {
    viewType: VIEW_TYPE.CALENDAR_MONTH,
    title: now.format("YYYY년 MM월"),
    curDate: now.valueOf(),
    prevDate: 0
};

class SchedulerPageReducer extends ImmerReducer<SchedulerPageState> {

    setViewType(payload: VIEW_TYPE) {
        this.draftState.viewType = payload;
    }

    setTitle(payload: string) {
        this.draftState.title= payload;
    }

    setCurDate (payload: number) {
        this.draftState.prevDate = this.draftState.curDate;
        this.draftState.curDate = payload;
    }
}

export const SchedulerPageActions = createActionCreators(SchedulerPageReducer);
export default createReducerFunction(SchedulerPageReducer, initialState);


const getTitleText = (curDate: moment.Moment, viewType: VIEW_TYPE) => {
    let titleFormat = "";
    switch (viewType) {
        case VIEW_TYPE.CALENDAR_YEAR: titleFormat = "YYYY년"; break;
        case VIEW_TYPE.CALENDAR_MONTH: titleFormat = "YYYY년 MM월"; break;
        case VIEW_TYPE.CALENDAR_WEEK:
            titleFormat = "YYYY년 MM월";
            break;
        case VIEW_TYPE.CALENDAR_DAY: titleFormat = "YYYY년 MM월 DD일"; break;
        case VIEW_TYPE.TIMELINE: titleFormat = "YYYY년 MM월 DD일"; break;
    }
    return curDate.format(titleFormat);
};

const SetTitleEpic: Epic<typeof SchedulerPageActions.setCurDate, RootState> = (action$, state$) =>
    action$.pipe(
        ofType(SchedulerPageActions.setCurDate.type),
        map(action => SchedulerPageActions.setTitle(getTitleText(moment(action.payload), state$.value.schedulerPage.viewType)))
    );

const SetViewTypeEpic: Epic<typeof SchedulerPageActions.setViewType, RootState> = (action$, state$) =>
    action$.pipe(
        ofType(SchedulerPageActions.setViewType.type),
        map(action => SchedulerPageActions.setTitle(getTitleText(moment(state$.value.schedulerPage.curDate), action.payload)))
    );

export const SchedulerPageEpics = [SetTitleEpic, SetViewTypeEpic];
