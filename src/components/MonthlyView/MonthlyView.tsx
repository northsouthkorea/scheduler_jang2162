import {Item, Row, Wrapper} from "@/components/MonthlyView/MonthlyViewStyled";
import moment from "moment";
import React from 'react';


const MonthlyView = (props: {curDate: number}) => {
    const curDate = moment(props.curDate);
    const prevMonth = curDate.clone().date(0);
    const nextMonth = curDate.clone().date(1).month(curDate.month() + 1);
    const rowNum = 5 - (prevMonth.day() === 6 && nextMonth.day() === 0 ? 1 : 0);

    const prevMonthDayOfWeek = prevMonth.day();
    const nextMonthDayOfWeek = nextMonth.day();
    const rows = Array(rowNum).fill(0).map((e, i) => {
        return (
            <Row key={i}>
                {
                    // 이전달
                    i === 0 && prevMonthDayOfWeek !== 6 &&
                    Array(prevMonthDayOfWeek+1).fill(0)
                        .map((ee,j)=> (<Item notCurrent key={`before${j}`}><span>{prevMonth.date()-j}</span></Item>)).reverse()
                }

                {
                    // 현재
                    Array(7).fill(0)
                        .map((ee, j)=> {
                            const day = j + i * 7 - (prevMonthDayOfWeek === 6 ? -1 : prevMonthDayOfWeek);
                            return (i === rowNum - 1 ?  nextMonthDayOfWeek === 0 || j < nextMonthDayOfWeek : day > 0) ? day : 0;
                        })
                        .filter(j => j !== 0)
                        .map(day => (<Item key={day}><span>{day}</span></Item>))
                }

                {
                    // 다음달
                    i === rowNum - 1 && nextMonthDayOfWeek !== 0 &&
                    Array(7-nextMonth.day()).fill(0)
                        .map((ee,j)=> (<Item notCurrent key={`next${j}`}><span>{j+1}</span></Item>))
                }
            </Row>
        )
    });

    return (
        <Wrapper>
            <Row>
                {"일월화수목금토".split("").map(text => (<Item key={text}><span>{text}</span></Item>))}
            </Row>
            {rows}
        </Wrapper>
    )
};

export default MonthlyView;

