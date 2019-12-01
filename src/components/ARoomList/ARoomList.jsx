import React from "react";
import RoomListItem from "../RoomListItem/RoomListItem";
import Toolbar from "../Toolbar/Toolbar";
import ToolbarButton from "../ToolbarButton/ToolbarButton";

import "./ARoomList.css";

export default function ARoomList(props) {
  const rooms = props.rooms;
  const title = props.title;

  return (
    <div className="room-list scrollable">
      {/* <div className="conversation-list scrollable"> */}

      <div className="mt-3 mb-3">
        <Toolbar title={title} />
      </div>

      {rooms.map(room => (
        <RoomListItem
          key={room.name + " list"}
          data={room}
          handleEnterRoom={props.handleEnterRoom}
        />
      ))}
    </div>
  );
}
