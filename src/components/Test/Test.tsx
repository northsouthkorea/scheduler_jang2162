import {TestActions} from "@/modules/TestModule";
import {RootState} from "@/store";
import React from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

const mapStateToProps = (state: RootState) => ({
    name: state.test.name,
    value: state.test.counter.value
});

const mapDispatchToProps = (dispatch: any) => ({
    ...bindActionCreators(TestActions, dispatch)
});

type TestPropType =
    ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>

interface TestProp {test: string}

const Test = (props: TestPropType & TestProp) => {
    const click = () => props.changeNameAndDelayedAdd({addNum: 5, name: "NEW TEST"});
    return (
        <div>
            {props.test}<br/><br/>
            Name: {props.name} <br/>
            Counter value: {props.value} <br/>
            <button onClick={click}>TEST</button>
        </div>
    )
};

export default connect(mapStateToProps, mapDispatchToProps)(Test);
