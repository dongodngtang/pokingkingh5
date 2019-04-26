import React, {Component} from 'react';
import {
    BrowserRouter as Router, Route
} from 'react-router-dom';
import App from './App';
import InfoDetail from './pages/InfoDetail'
import LoadApp from "./pages/LoadApp";
import EventDetail from "./pages/EventDetail";
import HomePage from "./pages/HomePage";
import QueueListPage from "./pages/QueueListPage";
import QueueListNewPage from "./pages/QueueListNewPage";

const Routes = () => (
    <Router>
        <App>
            <Route path="/queue_new" component={QueueListNewPage}/>
            <Route path="/queue" component={QueueListPage}/>
            <Route path="/home" component={HomePage}/>
            <Route path="/loadApp/" component={LoadApp}/>
            <Route path="/infos/:id/" component={InfoDetail}/>
            <Route path="/main_events/:event_id/infos/:id/" component={EventDetail}/>
        </App>
    </Router>
)

export default Routes;