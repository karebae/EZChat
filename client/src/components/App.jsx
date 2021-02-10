/* eslint-disable */
import React, { Component } from 'react';
import ChatRoom from './ChatRoom/ChatRoom.jsx'

import Login from './Login/Login.jsx'
import io from 'socket.io-client';
import moment from 'moment';

const ENDPOINT = "http://127.0.0.1:3000/";
/*------------------------------------------------------*/

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socket: null,
      login: false,
      firstName: 'default',
      lastName: 'none',
      email: 'none',
      reason: 'none',
      orderNumber: 'none',
      phone: 1234567890,
    };
    this.initSocketConnection = this.initSocketConnection.bind(this);
    this.initSocket = this.initSocket.bind(this)
  }


  componentDidMount() {
    this.initSocketConnection();
  }

  initSocketConnection() {
    let socket = io( ENDPOINT, { transport: ['websocket'] } );
    this.setState({ socket });

    socket.on('connect', () => {
      console.log( 'Connected to socket server!')
    });
  }


  // to change the view from <Login/> --> <ChatRoom/> and to pass user info horizontally across components
  initSocket (firstName, lastName, reason, orderNumber, email, phone) {
    this.setState({
      login: true,
      firstName,
      lastName,
      reason,
      orderNumber,
      email,
      phone,
    })
  }


  render() {
    return (
      this.state.login ?
        <ChatRoom
          socket={this.state.socket}
          firstName={this.state.firstName}
          lastName={this.state.lastName}
          reason={this.state.reason}
          orderNumber={this.state.orderNumber}
          email={this.state.email}
          phone={this.state.phone}
        />
        :

          <Login
          socket={this.state.socket}
          initSocket={this.initSocket}
        />



    );
  }
}

export default App;