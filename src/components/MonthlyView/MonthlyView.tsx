import {Item, Row, Wrapper} from '@/components/MonthlyView/MonthlyViewStyled';
import {range} from '@/lib/Utils';
import {LAST_CHANGE_FIELD} from '@/modules/SchedularPageModule';
import {store} from '@/store';
import {TweenMax} from 'gsap';
import moment from 'moment';
import React from 'react';
import {Transition, TransitionGroup} from 'react-transition-group';

export default React.memo((props: { curDate: number }) => {
    const curDate = moment(props.curDate);
    const prevMonth = curDate.clone().date(0);
    const nextMonth = curDate.clone().date(1).month(curDate.month() + 1);
    const prevKeyPrefix = `prev${prevMonth.format('YYYYMM')}`;
    const nextKeyPrefix = `next${nextMonth.format('YYYYMM')}`;
    const curKeyPrefix = `cur${curDate.format('YYYYMM')}`;
    const rowNum = 5 - (prevMonth.day() === 6 && nextMonth.day() === 0 ? 1 : 0);

    const prevMonthDayOfWeek = prevMonth.day();
    const nextMonthDayOfWeek = nextMonth.day();

    const onEnter = (node: HTMLElement) => {
        node.style.zIndex = '2';
        const state = store.getState();
        if (
            state.schedulerPage.lastChangeField === LAST_CHANGE_FIELD.CUR_DATE &&
            state.schedulerPage.lastChangeTimestamp2 - state.schedulerPage.lastChangeTimestamp1 > 500
        ) {
            const moveRight = state.schedulerPage.prevDate < state.schedulerPage.curDate;
            TweenMax.from(node, 0.3, {x: moveRight ? 75 : -75, opacity: 0});
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
        <TransitionGroup component={null}>
            <Transition key={curDate.valueOf()}
                        in
                        appear
                        timeout={300}
                        onEnter={onEnter}
                        onEntered={onEntered}
                        onExit={onExit}
            >
                <Wrapper>
                    <Row dayText>
                        {'일월화수목금토'.split('').map(text => (<Item key={text} dayText><span>{text}</span></Item>))}
                    </Row>
                    {range(rowNum).map(i => (
                        <Row key={i}>
                            {
                                // 이전 달
                                i === 0 && prevMonthDayOfWeek !== 6 &&
                                range(prevMonthDayOfWeek + 1)
                                    .map(j => (<Item notCurrent
                                                     key={`${prevKeyPrefix}${j}`}><span>{prevMonth.date() - j}</span></Item>)).reverse()
                            }

                            {
                                // 해당 달
                                range(7)
                                    .map(j => {
                                        const day = j + i * 7 - (prevMonthDayOfWeek === 6 ? -1 : prevMonthDayOfWeek);
                                        return (i === rowNum - 1 ? nextMonthDayOfWeek === 0 || j < nextMonthDayOfWeek : day > 0) ? (
                                            <Item key={`${curKeyPrefix}${day}`}><span>{day}</span></Item>) : null;
                                    })
                            }

                            {
                                // 다음 달
                                i === rowNum - 1 && nextMonthDayOfWeek !== 0 &&
                                range(7 - nextMonth.day())
                                    .map(j => (
                                        <Item notCurrent key={`${nextKeyPrefix}${j}`}><span>{j + 1}</span></Item>))
                            }
                        </Row>
                    ))}
                </Wrapper>
            </Transition>
        </TransitionGroup>
    )
});

