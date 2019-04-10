import {Item, Row, Wrapper} from "@/components/MonthlyView/MonthlyViewStyled";
import {range} from "@/lib/Utils";
import moment from "moment";
import React from 'react';


const MonthlyView = (props: {curDate: number}) => {
    const curDate = moment(props.curDate);
    const prevMonth = curDate.clone().date(0);
    const nextMonth = curDate.clone().date(1).month(curDate.month() + 1);
    const rowNum = 5 - (prevMonth.day() === 6 && nextMonth.day() === 0 ? 1 : 0);

    const prevMonthDayOfWeek = prevMonth.day();
    const nextMonthDayOfWeek = nextMonth.day();


    return (
        <Wrapper>
            <Row>
                {"일월화수목금토".split("").map(text => (<Item key={text}><span>{text}</span></Item>))}
            </Row>
            {range(rowNum).map(i => (
                <Row key={i}>
                    {
                        // 이전 달
                        i === 0 && prevMonthDayOfWeek !== 6 &&
                        range(prevMonthDayOfWeek+1)
                            .map(j => (<Item notCurrent key={`before${j}`}><span>{prevMonth.date()-j}</span></Item>)).reverse()
                    }

                    {
                        // 해당 달
                        range(7)
                            .map(j => {
                                const day = j + i * 7 - (prevMonthDayOfWeek === 6 ? -1 : prevMonthDayOfWeek);
                                return (i === rowNum - 1 ?  nextMonthDayOfWeek === 0 || j < nextMonthDayOfWeek : day > 0) ? (<Item key={day}><span>{day}</span></Item>) : null;
                            })
                    }

                    {
                        // 다음 달
                        i === rowNum - 1 && nextMonthDayOfWeek !== 0 &&
                        range(7-nextMonth.day()).fill(0)
                            .map(j => (<Item notCurrent key={`next${j}`}><span>{j+1}</span></Item>))
                    }
                </Row>
            ))}
        </Wrapper>
    )
};

export default MonthlyView;

