import {SchedulerPageActions} from '@/modules/SchedularPageModule';
import {RootState} from '@/store';
import moment from 'moment';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

const mapStateToProps = (state: RootState) => ({
    viewType: state.schedulerPage.viewType,
    title: state.schedulerPage.title,
    curDate: state.schedulerPage.curDate,
    firstLoad: state.schedulerPage.firstLoad
});

const mapDispatchToProps = (dispatch: any) => ({
    ...bindActionCreators(SchedulerPageActions, dispatch),
    setCurDate: (curDate: moment.Moment, timestamp: number = NaN) => dispatch(SchedulerPageActions.setCurDate(curDate.valueOf(), isNaN(timestamp) ? moment().valueOf() : timestamp))

});

export type propType =
    ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps);

