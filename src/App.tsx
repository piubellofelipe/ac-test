import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Tractor } from '@aircall/tractor';

import {
  Login,
  CallList,
  CallDetail,
} from './screens'
import { useAppSelector } from './commonHooks';
import { selectIsLoggedIn } from './redux/auth';



function  App() {
  const isLoggedIn = useAppSelector(selectIsLoggedIn);
  return (
    <Tractor injectStyle>
      <Router>
        <Switch>
          <Route exact path="/">
            {isLoggedIn ? <Redirect to="/calls" /> : <Redirect to="/calls" />}
          </Route>
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

