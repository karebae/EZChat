/* eslint-disable */
const helpers = require('./socketHelpers.js');
const events = require('./socketEvents.js');
let currentUsers = {};
let allMessages = [];
const mongoose = require('../models/index.js')


module.exports = (io) => (socket) => {
  console.log(`Socket ${socket.id} has been started!`);


  socket.on(events.NEW_USER, (firstName, lastName, reason, orderNumber, email, phone, callback) => {
    // Create new ticket
    const newTicket = helpers.createNewTicket(socket.id, firstName, lastName, reason, orderNumber, email, phone);
    // mongoose.createNewTicket(newTicket, (err, response) => {
    //   if (err) {
    //     console.log(err)
    //   } else {
    //     console.log(response)
    //   }
    // });

    helpers.createUser(currentUsers, firstName, socket.id); // socketId: firstName
    socket.join('defaultRoom'); // to refactor
    console.log(currentUsers);
    callback();
  });

  socket.on(events.SEND_MESSAGE, (message, senderName) => {
    var formattedMessage = helpers.createMessage(message, senderName);
    // mongoose.saveMessageInTicket(helpers.ticketNumber, formattedMessage, (err, response) => {
    //   if (err) {
    //     console.log(err)
    //   } else {
    //     // console.log(response)
    //   }
    // });
    // broadcast to appropriate room -- refactor
    io.to('defaultRoom').emit('message', formattedMessage);
  })

  // nodemailer https://medium.com/coox-tech/send-mail-using-node-js-express-js-with-nodemailer-93f4d62c83ee
  socket.on('disconnect', () => {

    // im using the socket id as the ticket id in the schema lol
    // mongoose.fetchByTicketId(socket.id, (err, response) => {
    //   if (err) {
    //     console.log(err)
    //   } else {
    //     // helpers.prepareEmail(response.customer_info.email, response)
    //     console.log(response)
    //   }
    // });
    helpers.deleteUser(currentUsers, socket.id);
    console.log(`This is who remains: ${JSON.stringify(currentUsers)}\n\n`);
  });
}
