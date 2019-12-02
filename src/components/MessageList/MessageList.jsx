import React, { useEffect, useState } from "react";
import Compose from "../Compose/Compose";
import Toolbar from "../Toolbar/Toolbar";
import ToolbarButton from "../ToolbarButton/ToolbarButton";
import Message from "../Message/Message";
import moment from "moment";

import "./MessageList.css";

const MY_USER_ID = "apple";

export default function MessageList(props) {
  const messages = props.messages;

  const renderMessages = () => {
    let i = 0;
    let messageCount = messages.length;
    let tempMessages = [];

    while (i < messageCount) {
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

      // Proceed to the next message.
      i += 1;
    }

    return tempMessages;
  };

  return (
    <div className="message-list">
      <Toolbar
        title="Room CHAOS"
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
        rightItems={[
          <ToolbarButton key="photo" icon="ion-ios-camera" />,
          <ToolbarButton key="image" icon="ion-ios-image" />,
          <ToolbarButton key="audio" icon="ion-ios-mic" />,
          <ToolbarButton key="money" icon="ion-ios-card" />,
          <ToolbarButton key="games" icon="ion-logo-game-controller-b" />,
          <ToolbarButton key="emoji" icon="ion-ios-happy" />
        ]}
      />
    </div>
  );
}
