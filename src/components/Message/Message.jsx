import React from "react";
import moment from "moment";
import "./Message.css";

export default function Message(props) {
  const { data, isMine, showTimestamp } = props;

  const friendlyTimestamp = moment(data.timestamp).format("LLLL");
  return (
    <div className={["message", `${isMine ? "mine" : ""}`].join(" ")}>
      {showTimestamp && <div className="timestamp">{friendlyTimestamp}</div>}

      <div className="bubble-container">
        <div className="bubble" title={friendlyTimestamp}>
          {isMine
            ? "To " + data.otherSide + ": "
            : "From " + data.otherSide + ": "}
          <strong>{data.message}</strong>
        </div>
      </div>
      {data.received === true ? (
        <p className="bubble-container received">received</p>
      ) : (
        ""
      )}
    </div>
  );
}
