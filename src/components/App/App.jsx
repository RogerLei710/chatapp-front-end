import React from "react";
import Messenger from "../Messenger/Messenger";
import Login from "../Login/Login";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

export default function App() {
  return (
    <Router>
      <div className="App">
        {/* <h1 className="mb-6">the page should no be refreshed</h1> */}
        <Switch>
          <Route
            path="/"
            exact
            render={props => <Login {...props} />}
            // component={() => <LandingPage appAuthen={appAuthen} />}
          />
          <Route
            path="/main"
            exact
            render={props => <Messenger {...props} />}
            // component={() => <LandingPage appAuthen={appAuthen} />}
          />
        </Switch>
      </div>
    </Router>
  );
}
