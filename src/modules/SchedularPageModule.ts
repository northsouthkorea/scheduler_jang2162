import {Epic} from '@/lib/SimpleEpic';
import {RootState} from '@/store';
import {createActionCreators, createReducerFunction, ImmerReducer} from 'immer-reducer';
import moment from 'moment';
import {ofType} from 'redux-observable';
import {map} from 'rxjs/operators';

export enum VIEW_TYPE {
    CALENDAR_MONTH,
    CALENDAR_WEEK,
    CALENDAR_DAY,
    CALENDAR_YEAR,
    TIMELINE,
}

export enum LAST_CHANGE_FIELD {
    VIEW_TYPE,
    CUR_DATE,
}

export interface SchedulerPageState {
    firstLoad: boolean;
    viewType: VIEW_TYPE;
    prevViewType: VIEW_TYPE;
    lastChangeField: LAST_CHANGE_FIELD;
    lastChangeTimestamp1: number;
    lastChangeTimestamp2: number;
    title: string;
    curDate: number;
    prevDate: number;
}

const now = moment();
const initialState: SchedulerPageState = {
    firstLoad: true,
    viewType: VIEW_TYPE.CALENDAR_MONTH,
    prevViewType: VIEW_TYPE.CALENDAR_MONTH,
    lastChangeField: LAST_CHANGE_FIELD.VIEW_TYPE,
    lastChangeTimestamp1: 0,
    lastChangeTimestamp2: 0,
    title: now.format('YYYY년 MM월'),
    curDate: now.valueOf(),
    prevDate: 0
};

class SchedulerPageReducer extends ImmerReducer<SchedulerPageState> {

    setViewType(viewType: VIEW_TYPE, timeStamp: number) {
        this.draftState.firstLoad = false;
        if (viewType !== this.draftState.viewType) {
            this.draftState.lastChangeTimestamp1 = this.draftState.lastChangeTimestamp2;
            this.draftState.lastChangeTimestamp2 = timeStamp;
            this.draftState.prevViewType = this.draftState.viewType;
            this.draftState.viewType = viewType;
            this.draftState.lastChangeField = LAST_CHANGE_FIELD.VIEW_TYPE;
        }
    }

    setTitle(payload: string) {
        this.draftState.title= payload;
    }

    setCurDate (curDate: number, timeStamp: number) {
        this.draftState.firstLoad = false;
        this.draftState.lastChangeTimestamp1 = this.draftState.lastChangeTimestamp2;
        this.draftState.lastChangeTimestamp2 = timeStamp;
        this.draftState.prevDate = this.draftState.curDate;
        this.draftState.curDate = curDate;
        this.draftState.lastChangeField = LAST_CHANGE_FIELD.CUR_DATE;
    }
}

export const SchedulerPageActions = createActionCreators(SchedulerPageReducer);
export default createReducerFunction(SchedulerPageReducer, initialState);


const getTitleText = (curDate: moment.Moment, viewType: VIEW_TYPE) => {
    let titleFormat = '';
    switch (viewType) {
        case VIEW_TYPE.CALENDAR_YEAR: titleFormat = 'YYYY년'; break;
        case VIEW_TYPE.CALENDAR_MONTH: titleFormat = 'YYYY년 MM월'; break;
        case VIEW_TYPE.CALENDAR_WEEK:
            const startDate = curDate.clone().date(curDate.date() - curDate.day());
            const endDate = startDate.clone().date(startDate.date() + 6);
            if (startDate.month() === endDate.month()) {
                return `${startDate.format('YYYY년 MM월 D일')} ~ ${endDate.format('D일')}`
            }else if (startDate.year() === endDate.year()) {
                return `${startDate.format('YYYY년 MM월 D일')} ~ ${endDate.format('MM월 D일')}`
            } else {
                return `${startDate.format('YYYY년 MM월 D일')} ~ ${endDate.format('YYYY년 MM월 D일')}`
            }
        case VIEW_TYPE.CALENDAR_DAY: titleFormat = 'YYYY년 MM월 D일'; break;
        case VIEW_TYPE.TIMELINE: titleFormat = 'YYYY년 MM월 D일'; break;
        default: break;
    }
    return curDate.format(titleFormat);
};

const SetCurDateEpic: Epic<typeof SchedulerPageActions.setCurDate, RootState> = (action$, state$) =>
    action$.pipe(
        ofType(SchedulerPageActions.setCurDate.type),
        map(action => SchedulerPageActions.setTitle(getTitleText(moment(action.payload[0]), state$.value.schedulerPage.viewType)))
    );

const SetViewTypeEpic: Epic<typeof SchedulerPageActions.setViewType, RootState> = (action$, state$) =>
    action$.pipe(
        ofType(SchedulerPageActions.setViewType.type),
        map(action => SchedulerPageActions.setTitle(getTitleText(moment(state$.value.schedulerPage.curDate), action.payload[0])))
    );

export const SchedulerPageEpics = [SetCurDateEpic, SetViewTypeEpic];
