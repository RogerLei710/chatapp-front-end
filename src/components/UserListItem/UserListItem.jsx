import React from "react";

import "./UserListItem.css";

export default function UserListItem(props) {
  const { name } = props.data;
  const avatar = "https://ui-avatars.com/api/?name=" + name;

  return (
    <div className="user-list-item">
      <img className="user-photo" src={avatar} alt="user" />
      <div className="user-info">
        <h1 className="user-title">{name}</h1>
        {/* <p className="conversation-snippet">{ text }</p> */}
      </div>
    </div>
  );
}
