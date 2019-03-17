import TestContainer, {TestPropType} from "@/containers/TestContainer";
import React from "react";

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

export default TestContainer(Test);
