import React, { useEffect, useState } from "react";
import Compose from "../Compose/Compose";
import Toolbar from "../Toolbar/Toolbar";
import ToolbarButton from "../ToolbarButton/ToolbarButton";
import Message from "../Message/Message";

import "./MessageList.css";

export default function MessageList(props) {
  const messages = props.messages;
  const MY_USER_ID = props.myself;

  const renderMessages = () => {
    let tempMessages = [];

    for (let i = 0; i < messages.length; i++) {
      let current = messages[i];
      let isMine = current.author === MY_USER_ID;

      tempMessages.push(
        <Message
          key={i}
          isMine={isMine}
          showTimestamp={i % 5 == 0 ? true : false}
          data={current}
          // startsSequence={startsSequence}
          // endsSequence={endsSequence}
        />
      );
    }

    return tempMessages;
  };

  return (
    <div className="message-list">
      <Toolbar
        title={props.title === "" ? "CHAOS" : props.title}
        rightItems={[
          <ToolbarButton key="contacts" icon="ion-ios-contacts" />,
          <ToolbarButton key="info" icon="ion-ios-information-circle-outline" />
          // <ToolbarButton key="phone" icon="ion-ios-call" />
        ]}
      />
      {messages === undefined ? (
        <div></div>
      ) : (
        <div className="message-list-container">{renderMessages()}</div>
      )}

      <Compose
        handleSendMSG={props.handleSendMSG}
        rightItems={[
          <ToolbarButton key="photo" icon="ion-ios-camera" />,
          <ToolbarButton key="image" icon="ion-ios-image" />,
          <ToolbarButton key="audio" icon="ion-ios-mic" />
        ]}
      />
    </div>
  );
}
