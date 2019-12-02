import React, { Component } from "react";
// import moment from "moment";

class CMRoom extends Component {
  state = {
    name: "",
    minAge: "",
    maxAge: "",
    continent: [],
    school: []
  };
  constructor(props) {
    super(props);
  }
  submitHandler = event => {
    event.preventDefault();
    this.props.submit(this.props.title, this.state);
  };

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  changeContinent = select => {
    let continent = [];
    for (let i = 0; i < select.options.length; i++) {
      if (select.options[i].selected) {
        continent.push(select.options[i].value);
      }
    }
    this.setState({ continent });
  };

  changeSchool = select => {
    let school = [];
    for (let i = 0; i < select.options.length; i++) {
      if (select.options[i].selected) {
        school.push(select.options[i].value);
      }
    }
    this.setState({ school });
  };

  render() {
    return (
      <div className="container">
        <div className="row mt-5">
          <div className="offset-4 col-4 mt-5 card shadow-lg">
            <form className="form-signin mt-5" onSubmit={this.submitHandler}>
              <div className="text-center mb-2">
                <h1 className="h3 mb-3 font-weight-normal">
                  {this.props.title + " Room"}
                </h1>
              </div>

              <div className="form-label-group">
                <label htmlFor="inputRoomname text-center">Room Name</label>
                <input
                  className="form-control"
                  onChange={this.changeHandler}
                  name="name"
                  required
                ></input>
              </div>

              <div className="form-label-group">
                <label htmlFor="inputMinAge text-center">Minimun Age</label>
                <input
                  className="form-control"
                  onChange={this.changeHandler}
                  name="minAge"
                  type="number"
                  required
                ></input>
              </div>
              <div className="form-label-group">
                <label htmlFor="inputMaxAge">Maximun Age</label>
                <input
                  className="form-control"
                  onChange={this.changeHandler}
                  name="maxAge"
                  type="number"
                  required
                ></input>
              </div>

              <div className="form-label-group">
                <label htmlFor="inputRegion">Region</label>
                <select
                  className="custom-select"
                  name="continent"
                  multiple="multiple"
                  onChange={event => this.changeContinent(event.target)}
                  required
                >
                  <option value="">Choose...</option>
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
                  multiple="multiple"
                  onChange={event => this.changeSchool(event.target)}
                >
                  <option value="">Choose...</option>
                  <option value="Rice">Rice</option>
                  <option value="Tsinghua">Tsinghua</option>
                  <option value="Stanford">Stanford</option>
                  <option value="MIT">MIT</option>
                  <option value="Zhejiang">Zhejiang</option>
                </select>
              </div>

              <p className="mt-3">
                <button
                  className="btn btn-sm btn-secondary btn-block"
                  onClick={this.props.cancel}
                >
                  Cancel
                </button>
              </p>
              <p>
                <button
                  className="btn btn-sm btn-primary  btn-block"
                  type="submit"
                >
                  {this.props.title}
                </button>
              </p>

              {/* <p className="mt-5 mb-3 text-muted text-center">
                Powered by <code>Chaos</code> team.{" "}
                <a href="https://pacman-team-chaos.herokuapp.com/">Have fun.</a>
              </p> */}
              <p className="mt-5 mb-3 text-muted text-center"></p>
            </form>
          </div>
        </div>
        {/* <p className="mt-5 mb-3 text-muted text-center">Chaos © 2019-2020</p> */}
      </div>
    );
  }
}

export default CMRoom;
