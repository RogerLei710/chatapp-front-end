import React, { Component } from "react";
import { w3cwebsocket as W3CWebSocket } from "websocket";

const client = new W3CWebSocket("ws://localhost:4567/chatapp");

class Login extends Component {
  state = {};

  constructor(props) {
    super(props);
    client.onopen = () => {
      console.log("WebSocket Client Connected");
    };
    client.onmessage = message => {
      console.log(JSON.parse(message.data));
    };
  }

  // return websocket to main page
  getSocket() {
    return client;
  }

  handleSumbit = () => {
    client.send(
      JSON.stringify({
        type: "createProfile",
        content: {
          name: "roger",
          age: 25,
          continent: "North America",
          school: "Rice University"
        }
      })
    );
    this.props.history.push({
      pathname: "/main"
    });
  };

  render() {
    return (
      <div className="container">
        <div className="row mt-2">
          <div className="offset-4 col-4 card shadow-lg">
            <form className="form-signin" onSubmit={this.handleSumbit}>
              <div className="text-center mb-2">
                <img
                  className="mb-2"
                  src="https://pbs.twimg.com/profile_images/1145725169765429248/E18K03-5_400x400.png"
                  alt=""
                  width="100"
                  height="100"
                ></img>
                <h1 className="h3 mb-3 font-weight-normal">Chaos Room</h1>
              </div>

              <div className="form-label-group">
                <label htmlFor="inputUsername text-center">Username</label>
                <input
                  id="inputUsername"
                  className="form-control"
                  placeholder="Username"
                  required=""
                  autoFocus=""
                ></input>
              </div>
              <div className="form-label-group">
                <label htmlFor="inputAge">Age</label>
                <input
                  id="inputAge"
                  className="form-control"
                  placeholder="Age"
                  required=""
                ></input>
              </div>

              <div className="form-label-group">
                <label htmlFor="inputRegion">Region</label>
                <select
                  className="multiple custom-select"
                  id="inputGroupSelect01"
                >
                  <option defaultValue>Choose...</option>
                  <option value="1">North America</option>
                  <option value="2">South America</option>
                  <option value="3">Asia</option>
                  <option value="4">Ocean</option>
                  <option value="5">Europe</option>
                  <option value="6">Africa</option>
                </select>
              </div>

              <div className="form-label-group">
                <label htmlFor="inputSchool">School</label>
                <select
                  className="multiple custom-select"
                  id="inputGroupSelect02"
                >
                  <option defaultValue>Choose...</option>
                  <option value="1">Rice</option>
                  <option value="2">Tsinghua</option>
                  <option value="3">Stanford</option>
                  <option value="4">UESTC</option>
                  <option value="5">Zhejiang</option>
                </select>
              </div>

              <button
                className="btn btn-lg btn-primary btn-block mt-4"
                type="submit"
              >
                Enter Louge
              </button>
              <p className="mt-5 mb-3 text-muted text-center">
                Powered by <code>Chaos</code> team.{" "}
                <a href="https://pacman-team-chaos.herokuapp.com/">Have fun.</a>
              </p>
            </form>
          </div>
        </div>
        <p className="mt-5 mb-3 text-muted text-center">Chaos © 2019-2020</p>
      </div>
    );
  }
}

export default Login;
