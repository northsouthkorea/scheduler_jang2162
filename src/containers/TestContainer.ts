import {TestActions} from "@/modules/TestModule";
import {RootState} from "@/store";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

const mapStateToProps = (state: RootState) => ({
    name: state.test.name,
    value: state.test.counter.value
});

const mapDispatchToProps = (dispatch: any) => ({
    ...bindActionCreators(TestActions, dispatch)
});

export type TestPropType =
    ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>

const TestContainer = connect(mapStateToProps, mapDispatchToProps);
export default TestContainer;
