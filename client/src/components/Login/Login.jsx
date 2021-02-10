import React from 'react';
import events from '../../../../server/socket/socketEvents.js'
import styles from './Login.css';

/*------------------------------------------------------*/
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: 'none',
      lastName: 'none',
      reason: 'none',
      orderNumber: 'none',
      email: 'none',
      phone: 1234567890,
    };
    this.initNewCustomer = this.initNewCustomer.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  /*----------------------------------------------------------*/

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
    });
  }

  initNewCustomer(event) {
    event.preventDefault();
    this.props.socket.emit(events.NEW_USER, this.state.firstName, this.state.lastName, this.state.reason, this.state.orderNumber, this.state.email, this.state.phone, (error) => {
      if (error) {
        alert(error);
      }
    });

    // App will render the ChatRoom component and pass all the user info horizontally to ChatRoom -- REDUX REFACTOR
    this.props.initSocket(this.state.firstName, this.state.lastName, this.state.reason, this.state.orderNumber, this.state.email, this.state.phone);
  }

  /*----------------------------------------------------------*/
  render() {
    return (
      <div>
        <div>
          <form className={styles.login_form} onSubmit={this.initNewCustomer}>
            <div className={styles.info_section}>
              <h4>Personal Information</h4>
              <div className={styles.form_content}>
                  <label className={styles.required}>
                    First Name
                  </label>
                <input id="firstName" onChange={this.handleChange} className={styles.input_box}/>
                  <label className={styles.required}>
                    Last Name
                  </label>
                <input id="lastName" onChange={this.handleChange} className={styles.input_box}/>
              </div>
            </div>

            <div className={styles.info_section}>
              <h4>Complaint Information</h4>
                <label className={styles.required}>
                  Reason for complaint - Please give as much information as possible.
                </label>
              <input id="reason" onChange={this.handleChange} className={styles.input_box}/>
                <label className={styles.required}>
                  Order Number
                </label>
              <input id="orderNumber" onChange={this.handleChange} className={styles.input_box}/>
            </div>

            <div className={styles.info_section}>
              <h4>Contact Information</h4>
                <label className={styles.required}>
                  Email address (for chat transcript)
                </label>
              <input id="email" onChange={this.handleChange} className={styles.input_box}/>
                <label className={styles.required}>
                  Telephone number (for complaint questions)
                </label>
              <input id="phone" onChange={this.handleChange} className={styles.input_box}/>
            </div>
            <h5>* Required Fields</h5>
            <button onClick={this.initNewCustomer}>Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
