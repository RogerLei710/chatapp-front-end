import React from "react";

import "./UserListItem.css";

export default function UserListItem(props) {
  const { photo, name, text } = props.data;

  return (
    <div className="user-list-item">
      <img className="user-photo" src={photo} alt="user" />
      <div className="user-info">
        <h1 className="user-title">{name}</h1>
        {/* <p className="conversation-snippet">{ text }</p> */}
      </div>
    </div>
  );
}
