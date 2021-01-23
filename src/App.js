import React from 'react';
import styled from 'styled-components';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import Login from './Login';
import UserDashboard from './UserDashboard';

const App = props => {

  return (
    <Router>
      <div>

      </div>
      <Switch>
        <Route path="/User">
          <UserDashboard />
        </Route>
        {/* <Route path="/Login"> */}
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
