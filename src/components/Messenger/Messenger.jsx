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
  state = {
    CMStatus: "none",
    myRooms: [],
    aRooms: [],
    chooseRoom: ""
  };

  constructor(props) {
    super(props);
    client = props.client;
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
        case "exitedRoom":
          this.exitRoom(JSON.parse(res.content));
          break;
        case "userExit":
          this.updateRoom(JSON.parse(res.content));
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

  getARooms = rooms => {
    let aRooms = [];
    for (let room of rooms) {
      room.icons = ["enter"];
      room.chatHistory = [];
      aRooms.push(room);
    }
    this.setState({ aRooms });
  };

  addARoom = room => {
    let aRooms = this.state.aRooms;
    room.icons = ["enter"];
    room.chatHistory = [];
    aRooms.push(room);
    this.setState({ aRooms });
  };

  createRoom = room => {
    let myRooms = this.state.myRooms;
    // room.icons = ["exit", "modify"];
    room.icons = ["exit"];
    room.chatHistory = [
      {
        id: 1,
        author: "apple",
        message: "Hello everyone, welcome to Chaos chat app!",
        timestamp: new Date().getTime()
      },
      {
        id: 2,
        author: "orange",
        message: "<strong>Jessie:</strong> My name is Jessie!",
        timestamp: new Date().getTime()
      },
      {
        id: 3,
        author: "orange",
        message: "Jessie: So nice to chat with you!",
        timestamp: new Date().getTime()
      },
      {
        id: 4,
        author: "apple",
        message:
          "It is so nice to meet you. I am at Rice University. Do you know who I am? HAHAHAHAH. LOL. I want to have a chat with you.",
        timestamp: new Date().getTime()
      },
      {
        id: 5,
        author: "apple",
        message: "Do you like our design?",
        timestamp: new Date().getTime()
      },
      {
        id: 6,
        author: "apple",
        message:
          "It looks like it wraps exactly as it is supposed to. Lets see what a reply looks like!",
        timestamp: new Date().getTime()
      },
      {
        id: 7,
        author: "orange",
        message:
          "Yudai: I think team chaos has great API design for certain. Yes, I like it. Would really love to choose it and implement it.",
        timestamp: new Date().getTime()
      },
      {
        id: 8,
        author: "orange",
        message: "Neo: Do you wanna to join me to watch the movie Joker",
        timestamp: new Date().getTime()
      },
      {
        id: 9,
        author: "apple",
        message: "I heard that this movie is wonderful and meaningful.",
        timestamp: new Date().getTime()
      },
      {
        id: 10,
        author: "orange",
        message:
          "Yang: I think so. I have watched it though. Maybe we could try another one?",
        timestamp: new Date().getTime()
      }
    ];
    myRooms.push(room);
    this.setState({ myRooms, chooseRoom: room });
  };

  joinRoom = room => {
    let myRooms = this.state.myRooms;
    room.icons = ["exit"];
    room.chatHistory = [];
    myRooms.push(room);

    this.setState({ myRooms, chooseRoom: room });
  };

  updateRoom = room => {
    let myRooms = this.state.myRooms;
    for (let myroom of myRooms) {
      if (myroom.name === room.name) {
        myroom.users = room.users;
        break;
      }
    }
    this.setState({ myRooms });
  };

  handleExitAllRooms = () => {
    let myRooms = this.state.myRooms;
    for (let myRoom of myRooms) {
      this.handleExitRoom(room);
    }
  };

  handleExitRoom = room => {
    let myRooms = this.state.myRooms;
    myRooms = myRooms.filter(myroom => myroom !== room);
    this.setState({ myRooms });
    let aRooms = this.state.aRooms;
    aRooms.push(room);

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
    this.setState({ chooseRoom: room });
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
          />
          <ARoomList
            rooms={this.state.aRooms}
            title={"Available Rooms"}
            changeCMRoomStatus={this.changeCMRoomStatus}
            handleEnterRoom={this.handleEnterRoom}
          />
        </div>

        <div className="scrollable content">
          <MessageList messages={this.state.chooseRoom.chatHistory} />
        </div>

        {/* {this.changeCMRoomStatus("create")} */}
        {this.renderCMRoom()}

        <div className="scrollable sidebar">
          <UserList users={this.state.chooseRoom.users} title={"Users"} />
        </div>
      </div>
    );
  }
}

export default Messenger;
