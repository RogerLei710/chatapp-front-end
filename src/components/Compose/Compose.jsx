import React from "react";
import "./Compose.css";

export default function Compose(props) {
  return (
    <div className="compose">
      <textarea
        type="text"
        className="compose-input"
        placeholder="Type a message, @name"
        rows="4"
      ></textarea>

      {/* <textarea
        className="form-control md-textarea"
        rows="4"
        placeholder="Type a message, @name"
        name="post"
        id="post"
      ></textarea> */}

      {props.rightItems}
    </div>
  );
}
