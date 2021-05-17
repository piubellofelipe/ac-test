import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { Tractor } from '@aircall/tractor';

import {
  Login,
  CallList,
  CallDetail,
} from './screens'


function  App() {
  return (
    <Tractor injectStyle>
      <Router>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route exact path="/calls">
            <CallList />
          </Route>
          <Route exact path="/calls/:id">
            <CallDetail />
          </Route>
        </Switch>
      </Router>
    </Tractor>
  );
}

export default App;

