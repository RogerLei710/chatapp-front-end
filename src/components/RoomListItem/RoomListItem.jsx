import React, { useEffect } from "react";
import shave from "shave";
import ToolbarButton from "../ToolbarButton/ToolbarButton";

import "./RoomListItem.css";

export default function RoomListItem(props) {
  useEffect(() => {
    shave(".room-snippet", 20);
  });

  const room = props.data;
  const { isSelected, name, icons } = props.data;
  const btns = [];

  const renderBtns = () => {
    for (let icon of icons) {
      if (icon === "enter") {
        btns.push(
          <ToolbarButton
            key={name + icon}
            icon="ion-ios-log-in"
            title="Enter Room"
            func={() => props.handleEnterRoom(room)}
          />
        );
      } else if (icon === "exit") {
        btns.push(
          <ToolbarButton
            key={name + icon}
            icon="ion-ios-log-out"
            func={() => props.handleExitRoom(room)}
            title="Leave Room"
          />
        );
      } else if (icon === "modify") {
        btns.push(
          <ToolbarButton
            key={name + icon}
            icon="ion-ios-create"
            func={props.changeCMRoomStatus}
            title="Modify Room"
          />
        );
      }
      btns.push(<span className="ml-2"></span>);
    }
    return btns;
  };

  return (
    <div
      className={["room-list-item", `${isSelected ? "bg-secondary" : ""}`].join(
        " "
      )}
    >
      <div className="room-info row">
        <div className="room-title col-lg-9" onClick={props.clickMyRoom}>
          {name}{" "}
        </div>
        <div className="float-right"> {renderBtns()} </div>
      </div>
    </div>
  );
}
