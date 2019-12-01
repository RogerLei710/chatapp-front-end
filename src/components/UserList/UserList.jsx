import React from "react";
import Toolbar from "../Toolbar/Toolbar";
import UserListItem from "../UserListItem/UserListItem";

import "./UserList.css";

export default function Users(props) {
  const users = props.users;
  const title = props.title;

  return (
    <div className="user-list scrollable">
      {/* <div className="conversation-list scrollable"> */}

      <Toolbar title={title} />
      {users.map(user => (
        <UserListItem key={user.name} data={user} />
      ))}
    </div>
  );
}
