import React, { useEffect } from "react";
import RoomListItem from "../RoomListItem/RoomListItem";
import Toolbar from "../Toolbar/Toolbar";
import ToolbarButton from "../ToolbarButton/ToolbarButton";

import "./MyRoomList.css";

export default function MyRoomList(props) {
  const rooms = props.rooms;
  const title = props.title;

  // useEffect(() => {
  //   shave(".room-snippet", 20);
  // });

  // const

  return (
    <div className="room-list scrollable">
      {/* <div className="conversation-list scrollable"> */}

      <Toolbar
        title={title}
        leftItems={[
          <ToolbarButton
            key="cog"
            icon="ion-ios-add-circle-outline"
            func={() => props.handleCMRoom("Create")}
            title="Create Room"
          />
        ]}
        rightItems={[
          <ToolbarButton
            key="add"
            icon="ion-ios-log-out"
            func={props.handleExitAllRooms}
            title="Exit All Rooms"
          />
        ]}
      />

      {rooms.map(room => (
        <RoomListItem
          key={room.name + " list"}
          data={room}
          handleCMRoom={() => props.handleCMRoom("Modify")}
          handleExitRoom={props.handleExitRoom}
        />
      ))}
    </div>
  );
}
