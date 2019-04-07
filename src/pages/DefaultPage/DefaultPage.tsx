import {Aside, Container, Header, Section} from "@/pages/DefaultPage/DefaultPageStyled";
import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom"
import SchedulePage from './SchedulePage/SchedulePage';

const DefaultPage = () => (
    <>
        <Header>
            This is Header
        </Header>
        <Container>
            <Aside>
                ASIDE
            </Aside>
            <Section>
                <Router>
                    <Switch>
                        <Route path="/" exact render={() => (<Redirect to="/schedules" />)} />
                        <Route path="/schedules" component={SchedulePage} />
                    </Switch>
                </Router>
            </Section>
        </Container>
    </>
);

export default DefaultPage;
