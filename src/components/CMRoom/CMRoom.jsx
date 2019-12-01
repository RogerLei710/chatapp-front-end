import React from "react";
// import moment from "moment";

export default function Login(props) {
  const title = props.title;
  // Create Room

  // If not, prompt an error and stop submitting.
  const submitHandler = event => {
    event.preventDefault();
    // event.target.className += " was-validated";
    // if (this.checkPwd()) {
    //   this.props.onSubmit(
    //     { username: this.state.username, password: this.state.password },
    //     "sign in"
    //   );
    // }
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="offset-4 col-4 mt-5 card shadow-lg">
          <form className="form-signin mt-5" onSubmit={submitHandler}>
            <div className="text-center mb-2">
              <img
                className="mb-2"
                src="http://icons.iconarchive.com/icons/icons8/windows-8/512/Household-Room-icon.png"
                alt=""
                width="100"
                height="100"
              ></img>
              <h1 className="h3 mb-3 font-weight-normal">{title + " Room"}</h1>
            </div>

            <div className="form-label-group">
              <label htmlFor="inputRoomname text-center">Room Name</label>
              <input
                id="inputRoomname"
                className="form-control"
                placeholder="Room Name"
                required=""
                autoFocus=""
              ></input>
            </div>

            <div className="form-label-group">
              <label htmlFor="inputMinAge text-center">Minimun Age</label>
              <input
                id="inputMinAge"
                className="form-control"
                placeholder="Minimun Age"
                required=""
                autoFocus=""
              ></input>
            </div>
            <div className="form-label-group">
              <label htmlFor="inputMaxAge">Maximun Age</label>
              <input
                id="inputMaxAge"
                className="form-control"
                placeholder="inputMaxAge"
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

            <p className="mt-3">
              <button
                className="btn btn-sm btn-secondary btn-block"
                onClick={props.cancel}
              >
                Cancel
              </button>
            </p>
            <p>
              <button
                className="btn btn-sm btn-primary  btn-block"
                type="submit"
              >
                {title}
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
