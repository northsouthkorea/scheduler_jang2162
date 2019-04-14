import React from 'react';
import {Link} from "react-router-dom";

const HomePage = () => (
    <div style={{padding: 50}}>
        Welcome, This is Home <br/>
        <Link to="/schedules">Schedules page</Link>
    </div>
);

export default HomePage;
