/* eslint-disable */

import React from 'react';
import moment from 'moment';

import IndividualMessage from '../IndividualMessage/IndividualMessage.jsx';
import events from '../../../../server/socket/socketEvents.js'
import styles from './ChatRoom.css';

/*------------------------------------------------------*/
class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      conversations: [],
      message: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  componentDidMount() {
    this.props.socket.on('message', message => {
      console.log('this is from socket ', message)
      this.setState({
        conversations: [...this.state.conversations, message]
      })
    });
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  handleSubmit(event){
    event.preventDefault();
    document.getElementById('message').value = '';
    this.sendMessage(this.state.message)
  }


  sendMessage(message){
    this.props.socket.emit(events.SEND_MESSAGE, message, this.props.firstName);
  }

  render() {
    return (
      <div>
        <h1>CustomerChat - Employee View</h1>
        <div className={styles.flex_grid}>
          <div className={styles.side_col}>
            <div className={styles.margin}>
              <div>
                <span className={styles.descriptor}>First name: </span>
                <span>{this.props.firstName}</span>
              </div>
              <div>
                <span className={styles.descriptor}>Last name: </span>
                <span>{this.props.lastName}</span>
              </div>
              <div>
                <span className={styles.descriptor}>Reason: </span>
                <span>{this.props.reason}</span>
              </div>
              <div>
                <span className={styles.descriptor}>Order #: </span>
                <span>{this.props.orderNumber}</span>
              </div>
              <div>
                <span className={styles.descriptor}>Email: </span>
                <span>{this.props.email}</span>
              </div>
              <div>
                <span className={styles.descriptor}>Phone: </span>
                <span>{this.props.phone}</span>
              </div>
            </div>

          </div>

          <div className={styles.middle_col}>
            <div className={styles.margin}>
              <div>
                {this.state.conversations.map((message) => (
                  <IndividualMessage
                    key={message.message_id}
                    message={message}
                  />
                ))}
              </div>
              <form onSubmit={this.handleSubmit}>
                <input id="message" placeholder="message" onChange={this.handleChange} className={styles.chat_input_box}/>
              </form>
            </div>


           </div>

        </div>
      </div>
    );
  }
}

export default ChatRoom;