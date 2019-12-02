// import React from "react";
import React, { Component } from "react";

import MyRoomList from "../MyRoomList/MyRoomList";
import ARoomList from "../ARoomList/ARoomList";
import MessageList from "../MessageList/MessageList";
import UserList from "../UserList/UserList";
import CMRoom from "../CMRoom/CMRoom";

import "./Messenger.css";
import axios from "axios";

let client;

class Messenger extends Component {
  state = {
    CMStatus: "none",
    myRooms: [],
    aRooms: [],
    users: []
  };

  constructor(props) {
    super(props);
    client = props.client;
    this.handleMsg();

    // Don't call this.setState() here!
    // this.state = { status: "" };
    this.getUsers();
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
          this.createMRoom(JSON.parse(res.content));
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

  handleCMRoom = status => {
    if (status === "Create") {
      client.send(
        JSON.stringify({
          type: "createRoom",
          content: {
            name: "roger",
            minAge: 20,
            maxAge: 30,
            continent: ["North America", "South America"],
            school: ["Rice", "Tsinghua"]
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

  createMRoom = room => {
    let myRooms = this.state.myRooms;
    room.icons = ["exit", "modify"];
    room.chatHistory = [];
    myRooms.push(room);
    this.setState({ myRooms });
  };

  getUsers = () => {
    axios.get("https://randomuser.me/api/?results=15").then(response => {
      let users = response.data.results.map(result => {
        return {
          photo: result.picture.large,
          name: `${result.name.first} ${result.name.last}`,
          text:
            "Hello world! This is a long message that needs to be truncated."
        };
      });
      this.setState({ users: users });
    });
  };

  handleExitAllRooms = () => {
    this.setState({ myRooms: [] });
  };

  handleExitRoom = room => {
    let myRooms = this.state.myRooms;
    myRooms = myRooms.filter(myroom => myroom !== room);
    this.setState({ myRooms });
    let aRooms = this.state.aRooms;
    room.icons = ["enter"];
    aRooms.push(room);
    this.setState({ aRooms });
  };

  handleEnterRoom = room => {
    let aRooms = this.state.aRooms;
    aRooms = aRooms.filter(aroom => aroom !== room);
    this.setState({ aRooms });
    let myRooms = this.state.myRooms;
    room.icons = ["exit"];
    myRooms.push(room);
    this.setState({ myRooms });
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
          />
          <ARoomList
            rooms={this.state.aRooms}
            title={"Available Rooms"}
            changeCMRoomStatus={this.changeCMRoomStatus}
            handleEnterRoom={this.handleEnterRoom}
          />
        </div>

        <div className="scrollable content">
          <MessageList />
        </div>

        {/* {this.changeCMRoomStatus("create")} */}
        {this.renderCMRoom()}

        <div className="scrollable sidebar">
          <UserList users={this.state.users} title={"Users"} />
        </div>
      </div>
    );
  }
}

export default Messenger;
