import React, {Component} from 'react';
import {
    BrowserRouter as Router, Route
} from 'react-router-dom';
import App from './App';
import InfoDetail from './pages/InfoDetail'

const Routes = () => (
   <Router>
       <App>
           {/*<Route path="/info" component={First}/>*/}
           <Route path="/info/:id/" component={InfoDetail}/>
       </App>
  </Router>
)

export default Routes;