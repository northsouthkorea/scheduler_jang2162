import {
    AllDayEventsWrapper,
    Bottom, Item, Row,
    TimeEventsWrapper, TimeText,
    Top,
    TopHeader,
    Wrapper
} from '@/components/DailyView/DailyViewStyled';
import {range} from '@/lib/Utils';
import {LAST_CHANGE_FIELD} from '@/modules/SchedularPageModule';
import {store} from '@/store';
import {TweenMax} from 'gsap';
import moment from 'moment';
import React from 'react';
import {Transition, TransitionGroup} from 'react-transition-group';


export default (props: { curDate: number }) => {
    const curDate = moment(props.curDate);

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
                    <Top>
                        <TopHeader>
                            {`${'일월화수목금토일'[curDate.day()]}요일`} <br/>
                            <b>{curDate.date()}</b>
                        </TopHeader>
                        <AllDayEventsWrapper>
                            <div></div>
                        </AllDayEventsWrapper>
                    </Top>
                    <Bottom>
                        <TimeEventsWrapper>
                            {
                                range(24).map(i => {
                                    return (<Row key={i}>
                                        <TimeText><span>{i !== 0 && (i < 12 ? `오전 ${i}시` : `오후 ${i === 12 ? 12 : i - 12}시`)}</span></TimeText>
                                        <Item>
                                            <div></div>
                                        </Item>
                                    </Row>)
                                })
                            }
                        </TimeEventsWrapper>
                    </Bottom>
                </Wrapper>
            </Transition>
        </TransitionGroup>
    )
}