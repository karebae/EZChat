/* eslint-disable */

const moment = require('moment');
const { v4: uuid } = require('uuid');
const nodemail = require('../nodemailer/index.js');
const ticketNumber = uuid();

module.exports = {
  // ticketNumber, // this is not reproducing every time there's a new user

  createUser: function(userDict, firstName, socketId) {
    userDict[socketId] = firstName;
    return userDict;
  },

  deleteUser: function(userDict, socketId) {
    console.log(`\n${userDict[socketId]} has left!`);
    delete userDict[socketId];
    return userDict;
  },


  createNewTicket: function(socketId, firstName, lastName, reason, orderNumber, email, phone) {
    return {
      ticket_id: socketId,
      priority: 'low',
      created: Date.now(),
      last_updated: Date.now(),
      closed: false,
      employee_id: uuid(),
      customer_info: {
        customer_id: uuid(),
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: phone,
      },
      complaint: reason,
      order_number: orderNumber,
      messages: [],
    }
  },

  createMessage: function(message, senderName) {
    return {
      message_id: uuid(),
      timestamp: Date.now(),
      text: message,
      sender: senderName, // refactor later
    }
  },

  prepareEmail: function(email, text) {
    const mailContent = {
      from: 'kaizawa77@gmail.com',
      to: email,
      subject: 'Karin is using you as a guinea pig',
      // text: JSON.stringify(text),
      html: '<b>Thanks for participating!</b><br><br>Karin is doing a test run of her app to make sure it can send automated emails. Karin says thank you for allowing her to you use you as a guinea pig.<br/>',
      attachments: [
        {
            filename: 'pusheen.png',
            path: '/Users/karinaizawa/Desktop/personal/CustomerChat/server/nodemailer/pusheen.png'
        },
      ]
    };

    nodemail.transporter.sendMail(mailContent, (error, info) => {
      if (error) {
          return console.log(error);
      } else {
        console.log(info);
      }
    });
  }
}