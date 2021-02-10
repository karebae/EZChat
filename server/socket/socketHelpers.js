const { v4: uuid } = require('uuid');
const nodemail = require('../nodemailer/index.js');

module.exports = {
  createUser(userDict, firstName, socketId) {
    userDict[socketId] = firstName;
    return userDict;
  },

  deleteUser(userDict, socketId) {
    console.log(`\n${userDict[socketId]} has left!`);
    delete userDict[socketId];
    return userDict;
  },

  createNewTicket(socketId, firstName, lastName, reason, orderNumber, email, phone) {
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
        email,
        phone,
      },
      complaint: reason,
      order_number: orderNumber,
      messages: [],
    };
  },

  createMessage(message, senderName) {
    return {
      message_id: uuid(),
      timestamp: Date.now(),
      text: message,
      sender: senderName,
    };
  },

  prepareEmail(email, text) {
    const mailContent = {
      from: '',
      to: email,
      subject: 'Your customer support receipt from EZChat',
      html: '<b>Thanks for using EZChat!</b>',
      text,
      attachments: [
        {
          filename: 'pusheen.png',
          path: '',
        },
      ],
    };

    nodemail.transporter.sendMail(mailContent, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(info);
      }
    });
  },
};
