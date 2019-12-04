import React, { Component } from "react";

let client;

class Login extends Component {
  state = {
    name: "",
    age: "",
    continent: "North America",
    school: "Rice",
    warning: ""
  };

  constructor(props) {
    super(props);
    client = props.client;
    client.onmessage = message => {
      let res = JSON.parse(message.data);
      if (res.type === "success") {
        this.props.history.push({
          pathname: "/main",
          state: this.state
        });
      } else {
        this.setState({ warning: "User name already exists!" });
      }
    };
  }

  handleSumbit = event => {
    event.preventDefault();
    client.send(
      JSON.stringify({
        type: "createProfile",
        content: {
          name: this.state.name,
          age: this.state.age,
          continent: this.state.continent,
          school: this.state.school
        }
      })
    );
  };

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
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
                <span name="warning" className="text-danger ml-2">
                  {this.state.warning}
                </span>
                <input
                  className="form-control"
                  required
                  name="name"
                  onChange={this.changeHandler}
                ></input>
              </div>
              <div className="form-label-group">
                <label htmlFor="inputAge">Age</label>
                <input
                  className="form-control"
                  required
                  name="age"
                  type="number"
                  onChange={this.changeHandler}
                ></input>
              </div>

              <div className="form-label-group">
                <label htmlFor="inputRegion">Region</label>
                <select
                  className="custom-select"
                  required
                  name="continent"
                  onChange={this.changeHandler}
                  defaultValue="North America"
                >
                  <option value="" disabled>
                    Choose...
                  </option>
                  <option value="North America">North America</option>
                  <option value="South America">South America</option>
                  <option value="Asia">Asia</option>
                  <option value="Ocean">Ocean</option>
                  <option value="Europe">Europe</option>
                  <option value="Africa">Africa</option>
                </select>
              </div>

              <div className="form-label-group">
                <label htmlFor="inputSchool">School</label>
                <select
                  className="custom-select"
                  required
                  name="school"
                  onChange={this.changeHandler}
                  defaultValue="Rice"
                >
                  <option value="" disabled>
                    Choose...
                  </option>
                  <option value="Rice">Rice</option>
                  <option value="Tsinghua">Tsinghua</option>
                  <option value="Stanford">Stanford</option>
                  <option value="MIT">MIT</option>
                  <option value="Zhejiang">Zhejiang</option>
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
