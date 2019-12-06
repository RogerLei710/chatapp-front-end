import React from "react";
import Messenger from "../Messenger/Messenger";
import Login from "../Login/Login";
import { w3cwebsocket as W3CWebSocket } from "websocket";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

export default function App() {
  const client = new W3CWebSocket(
    "wss://chatapp-team-chaos.herokuapp.com/chatapp"
    // "ws://localhost:4567/chatapp"
  );
  client.onopen = () => {
    console.log("WebSocket Client Connected");
  };

  return (
    <Router>
      <div className="App">
        {/* <h1 className="mb-6">the page should no be refreshed</h1> */}
        <Switch>
          <Route
            path="/"
            exact
            render={props => <Login {...props} client={client} />}
            // component={() => <Login client={client} />}
          />
          <Route
            path="/main"
            exact
            render={props => <Messenger {...props} client={client} />}
            // component={() => <Messenger client={client} />}
          />
        </Switch>
      </div>
    </Router>
  );
}
