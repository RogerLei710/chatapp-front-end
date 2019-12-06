import React from "react";

import "./UserListItem.css";

export default function UserListItem(props) {
  const { name } = props.data;
  let value = 0;
  for (let i = 0; i < name.length; i++) {
    value += name.charCodeAt(i);
  }
  value = (value % 30) * 12;

  const avatarURL =
    "https://ui-avatars.com/api/?color=fff&name=" +
    name +
    "&background=" +
    HSL2RGB(value);

  function HSL2RGB(h) {
    h /= 360;
    let rgb = [];
    let strColor = "";
    rgb.push(h + 1 / 3);
    rgb.push(h);
    rgb.push(h - 1 / 3);
    for (let i = 0; i < rgb.length; i++) {
      let tc = rgb[i];
      if (tc < 0) {
        tc = tc + 1;
      } else if (tc > 1) {
        tc = tc - 1;
      }
      switch (true) {
        case tc < 1 / 6:
          tc = 6 * tc;
          break;
        case 1 / 6 <= tc && tc < 0.5:
          tc = 1;
          break;
        case 0.5 <= tc && tc < 2 / 3:
          tc = 4 - 6 * tc;
          break;
        default:
          tc = 0;
          break;
      }
      rgb[i] = Math.round(tc * 255);
      let hexString = rgb[i].toString(16);
      strColor += hexString.length == 1 ? "0" + hexString : hexString;
    }
    return strColor;
  }

  return (
    <div
      className={
        props.chooseUser !== "" && props.chooseUser.name === name
          ? "user-list-item-selected"
          : "user-list-item"
      }
      onClick={props.clickUser}
    >
      <img className="user-photo" src={avatarURL} alt="user" />
      <div className="user-info">
        <h1 className="user-title">{name}</h1>
        {/* <p className="conversation-snippet">{ text }</p> */}
      </div>
    </div>
  );
}
