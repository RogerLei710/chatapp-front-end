// import React from "react";
import React, { Component } from "react";

import MyRoomList from "../MyRoomList/MyRoomList";
import ARoomList from "../ARoomList/ARoomList";
import MessageList from "../MessageList/MessageList";
import UserList from "../UserList/UserList";
import CMRoom from "../CMRoom/CMRoom";
import Login from "../Login/Login";

import "./Messenger.css";
import axios from "axios";

let client;

class Messenger extends Component {
  state = {
    CMStatus: "none",
    myRooms: "arr",
    aRooms: "arr",
    users: "arr"
  };

  constructor(props) {
    super(props);
    client = Login.getSocket();
    client.send(
      JSON.stringify({
        type: "getAvailableRooms",
        content: ""
      })
    );
    client.onmessage = message => {
      console.log(JSON.parse(message.data));
    };
    // Don't call this.setState() here!
    // this.state = { status: "" };
    this.getMyRooms();
    this.getARooms();
    this.getUsers();
  }

  handleCMRoom = status => {
    this.setState({ CMStatus: status });
  };

  renderCMRoom = () => {
    if (this.state.CMStatus !== "none") {
      return (
        <div className="absolute-create-room">
          <CMRoom
            title={this.state.CMStatus}
            cancel={() => this.handleCMRoom("none")}
          />
        </div>
      );
    }
  };

  getMyRooms = () => {
    axios.get("https://randomuser.me/api/?results=6").then(response => {
      let i = 0;
      let myRooms = response.data.results.map(result => {
        i++;
        return {
          name: "Room " + i,
          icons: i % 2 === 1 ? ["exit", "modify"] : ["exit"],
          chatHistory: []
        };
      });
      this.setState({ myRooms: myRooms });
    });
  };

  getARooms = () => {
    axios.get("https://randomuser.me/api/?results=6").then(response => {
      let i = 10;
      let aRooms = response.data.results.map(result => {
        i++;
        return {
          name: "Room " + i,
          icons: ["enter"],
          chatHistory: []
        };
      });
      this.setState({ aRooms: aRooms });
    });
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
    if (
      this.state.myRooms === "arr" ||
      this.state.aRooms === "arr" ||
      this.state.users === "arr"
    )
      return <div>loading</div>;
    return (
      <div className="messenger">
        <div className="scrollable sidebar">
          <MyRoomList
            rooms={this.state.myRooms}
            title={"My Rooms"}
            handleCMRoom={this.handleCMRoom}
            handleExitAllRooms={this.handleExitAllRooms}
            handleExitRoom={this.handleExitRoom}
          />
          <ARoomList
            rooms={this.state.aRooms}
            title={"Available Rooms"}
            handleCMRoom={this.handleCMRoom}
            handleEnterRoom={this.handleEnterRoom}
          />
        </div>

        <div className="scrollable content">
          <MessageList />
        </div>

        {/* {this.handleCMRoom("create")} */}
        {this.renderCMRoom()}

        <div className="scrollable sidebar">
          <UserList users={this.state.users} title={"Users"} />
        </div>
      </div>
    );
  }
}

export default Messenger;
