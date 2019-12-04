// import React from "react";
import React, { Component } from "react";

import MyRoomList from "../MyRoomList/MyRoomList";
import ARoomList from "../ARoomList/ARoomList";
import MessageList from "../MessageList/MessageList";
import UserList from "../UserList/UserList";
import CMRoom from "../CMRoom/CMRoom";

import "./Messenger.css";

let client;

class Messenger extends Component {
  state = {};

  constructor(props) {
    super(props);
    client = props.client;
    this.state = {
      CMStatus: "none",
      myRooms: [],
      aRooms: [],
      chooseRoom: "",
      chooseUser: "",
      user: props.location.state
    };

    this.handleMsg();

    // Don't call this.setState() here!
    // this.state = { status: "" };
  }

  handleMsg = () => {
    client.send(
      JSON.stringify({
        type: "getAvailableRooms",
        content: {}
      })
    );

    client.onmessage = message => {
      let res = JSON.parse(message.data);
      switch (res.type) {
        case "availableRooms":
          this.getARooms(JSON.parse(res.content));
          break;
        case "success":
          break;
        case "newRoom":
          this.addARoom(JSON.parse(res.content));
          break;
        case "createdRoom":
          this.createRoom(JSON.parse(res.content));
          break;
        case "joinedRoom":
          this.joinRoom(JSON.parse(res.content));
          break;
        case "userJoin":
          this.updateRoom(JSON.parse(res.content));
          break;
        case "userExit":
          this.updateRoom(JSON.parse(res.content));
          break;
        case "roomDismiss":
          this.roomDismiss(JSON.parse(res.content));
          break;
        case "ownerExit":
          this.ownerExit(JSON.parse(res.content));
          break;
        case "availableRoomOwnerExit":
          this.AROwnerExit(JSON.parse(res.content));
          break;
        case "chatMsg":
          this.recieveMsg(JSON.parse(res.content));
          break;
        default:
          break;
      }
    };

    client.onclose = message => {
      console.log(message);
    };
  };

  changeCMRoomStatus = status => {
    this.setState({ CMStatus: status });
  };

  handleCMRoom = (status, info) => {
    // for this project, we don't implement modification of room.
    if (status === "Create") {
      client.send(
        JSON.stringify({
          type: "createRoom",
          content: {
            name: info.name,
            minAge: info.minAge,
            maxAge: info.maxAge,
            continent: info.continent,
            school: info.school
          }
        })
      );
    }
    this.changeCMRoomStatus("none");
  };

  renderCMRoom = () => {
    let CMStatus = this.state.CMStatus;
    if (CMStatus !== "none") {
      return (
        <div className="absolute-create-room">
          <CMRoom
            title={CMStatus}
            cancel={() => this.changeCMRoomStatus("none")}
            submit={this.handleCMRoom}
          />
        </div>
      );
    }
  };

  // recieve availableRooms msg
  getARooms = rooms => {
    let aRooms = [];
    for (let room of rooms) {
      room.icons = ["enter"];
      room.chatHistory = [];
      aRooms.push(room);
    }
    this.setState({ aRooms });
  };

  // recieve newRoom msg
  addARoom = room => {
    let aRooms = this.state.aRooms;
    room.icons = ["enter"];
    room.chatHistory = [];
    aRooms.push(room);
    this.setState({ aRooms });
  };

  // recieve create room msg
  createRoom = room => {
    let myRooms = this.state.myRooms;
    // room.icons = ["exit", "modify"];
    room.icons = ["exit"];
    room.isSelected = true;
    room.chatHistory = [];
    myRooms.push(room);
    this.setState({ myRooms, chooseRoom: room, chooseUser: "" });
  };

  // recieve newRoom msg
  joinRoom = room => {
    let myRooms = this.state.myRooms;
    room.icons = ["exit"];
    room.chatHistory = [];
    room.isSelected = true;
    myRooms.push(room);

    this.setState({ myRooms, chooseRoom: room, chooseUser: "" });
  };

  // recieve userJoin, userExit msg
  updateRoom = room => {
    let myRooms = this.state.myRooms;
    for (let myroom of myRooms) {
      if (myroom.name === room.name) {
        myroom.users = room.users;
        break;
      }
    }
    this.setState({ myRooms, chooseUser: "" });
  };

  handleExitAllRooms = () => {
    let myRooms = this.state.myRooms;
    for (let room of myRooms) {
      this.handleExitRoom(room);
    }
  };

  handleExitRoom = room => {
    let myRooms = this.state.myRooms;
    myRooms = myRooms.filter(myroom => myroom !== room);
    let aRooms = this.state.aRooms;
    room.icons = ["enter"];
    aRooms.push(room);
    this.setState({ myRooms, aRooms, chooseUser: "" });
    if (myRooms.length > 0) {
      let chooseRoom = this.state.myRooms[0];
      this.setState({ chooseRoom });
    } else {
      this.setState({ chooseRoom: "" });
    }

    client.send(
      JSON.stringify({
        type: "exitRoom",
        content: { name: room.name }
      })
    );
  };

  handleEnterRoom = room => {
    let aRooms = this.state.aRooms;
    aRooms = aRooms.filter(aroom => aroom !== room);
    this.setState({ aRooms });

    client.send(
      JSON.stringify({
        type: "joinRoom",
        content: { name: room.name }
      })
    );
  };

  clickMyRoom = room => {
    this.setState({ chooseRoom: room, chooseUser: "" });
  };

  // recieve roomDismiss msg
  roomDismiss = room => {
    let aRooms = this.state.aRooms;
    aRooms = aRooms.filter(aroom => aroom.name !== room.name);
    this.setState({ aRooms });
  };

  // recieve ownerExit msg
  ownerExit = room => {
    let myRooms = this.state.myRooms;
    myRooms = myRooms.filter(myroom => myroom.name !== room.name);
    this.setState({ myRooms });
    if (myRooms.length > 0 && room.name === this.state.chooseRoom.name) {
      let chooseRoom = this.state.myRooms[0];
      this.setState({ chooseRoom });
    } else {
      this.setState({ chooseRoom: "" });
    }
  };

  // recieve availableRoomOwnerExit msg
  AROwnerExit = room => {
    let aRooms = this.state.aRooms;
    aRooms = aRooms.filter(aRoom => aRoom.name !== room.name);
    this.setState({ aRooms });
  };

  clickUser = user => {
    this.setState({ chooseUser: user });
  };

  handleSendMSG = msg => {
    if (this.state.chooseRoom === "" || this.state.chooseUser === "")
      return false;
    client.send(
      JSON.stringify({
        type: "sendMsg",
        content: {
          receiver: this.state.chooseUser.name,
          room: this.state.chooseRoom.name,
          text: msg
        }
      })
    );
    return true;
  };

  // recieve chatMsg msg
  recieveMsg = msg => {
    let myRooms = this.state.myRooms;
    for (let room of myRooms) {
      if (room.name === msg.chatRoomName) {
        let tmpMsg = {
          id: room.chatHistory.length,
          author: msg.senderName,
          message: msg.text,
          timestamp: new Date(msg.sendTime).getTime()
        };
        room.chatHistory.push(tmpMsg);
      }
    }
    this.setState(myRooms);
  };

  render() {
    return (
      <div className="messenger">
        <div className="scrollable sidebar">
          <MyRoomList
            rooms={this.state.myRooms}
            title={"My Rooms"}
            changeCMRoomStatus={this.changeCMRoomStatus}
            handleExitAllRooms={this.handleExitAllRooms}
            handleExitRoom={this.handleExitRoom}
            clickMyRoom={this.clickMyRoom}
            chooseRoom={this.state.chooseRoom}
          />
          <ARoomList
            rooms={this.state.aRooms}
            title={"Available Rooms"}
            changeCMRoomStatus={this.changeCMRoomStatus}
            handleEnterRoom={this.handleEnterRoom}
          />
        </div>

        <div className="scrollable content">
          <MessageList
            messages={this.state.chooseRoom.chatHistory}
            myself={this.state.user.name}
            handleSendMSG={this.handleSendMSG}
          />
        </div>

        {/* {this.changeCMRoomStatus("create")} */}
        {this.renderCMRoom()}

        <div className="scrollable sidebar">
          <UserList
            users={this.state.chooseRoom.users}
            title={"Users"}
            clickUser={this.clickUser}
            chooseUser={this.state.chooseUser}
          />
        </div>
      </div>
    );
  }
}

export default Messenger;
