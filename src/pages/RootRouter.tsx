import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import DefaultPage from "./DefaultPage/DefaultPage";
import TestPage from "./TestPage/TestPage";

const RootRouter = () => {
    return (
        <Router>
            <div>
                <Route path="/" exact component={DefaultPage} />
                <Route path="/test" component={TestPage} />
            </div>
        </Router>
    )
};

export default RootRouter;
