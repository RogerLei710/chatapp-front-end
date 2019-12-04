import React from "react";
import Toolbar from "../Toolbar/Toolbar";
import UserListItem from "../UserListItem/UserListItem";

import "./UserList.css";

export default function Users(props) {
  const users = props.users;
  const title = props.title;
  const myself = props.myself;

  // if I am the owner of the room, create To All user.
  if (users !== undefined && myself === users[0].name) {
    users.unshift({
      name: "To All"
    });
  }

  return (
    <div className="user-list scrollable">
      {/* <div className="conversation-list scrollable"> */}

      <Toolbar title={title} />
      {users === undefined ? (
        <div></div>
      ) : (
        users.map(user => (
          <UserListItem
            key={user.name}
            data={user}
            clickUser={() => props.clickUser(user)}
            chooseUser={props.chooseUser}
          />
        ))
      )}
    </div>
  );
}
