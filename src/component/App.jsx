
import React from "react";
import Quiz from "./Quiz";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import Login from "./Login";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/" component={Quiz} />
      </Switch>
    </Router>
  );
}
