import React, { Component } from "react";
import "./Compose.css";

class Compose extends Component {
  state = {
    msg: ""
  };

  changeHandler = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSendMSG = event => {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13 && !event.shiftKey && this.state.msg !== "") {
      // Cancel the default action, if needed
      event.preventDefault();
      let res = this.props.handleSendMSG(this.state.msg);
      if (res === true) {
        this.setState({ msg: "" });
      }
    }
  };

  render() {
    return (
      <div className="compose">
        <textarea
          type="text"
          className="compose-input"
          placeholder="Type a message, @name"
          rows="1"
          name="msg"
          onChange={this.changeHandler}
          onKeyDown={this.handleSendMSG}
          value={this.state.msg}
        ></textarea>

        {this.props.rightItems}
      </div>
    );
  }
}

export default Compose;
