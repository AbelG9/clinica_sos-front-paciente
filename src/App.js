import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from './pages/Login';
import PrivateRoute from './PrivateRoute';
import Home from './pages/callcenter/Home';

function App() {
  return (
    <Fragment>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <PrivateRoute exact path="/home" component={Home} />
        </Switch>
      </Router>
    </Fragment>
  );
}

export default App;
