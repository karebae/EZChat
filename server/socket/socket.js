const helpers = require('./socketHelpers.js');
const events = require('./socketEvents.js');

const currentUsers = {};
const mongoose = require('../models/index.js');

module.exports = (io) => (socket) => {
  console.log(`Socket ${socket.id} has been started!`);

  socket.on(events.NEW_USER, (firstName, lastName, reason, orderNumber, email, phone, callback) => {
    // Create new ticket
    // eslint-disable-next-line max-len
    const newTicket = helpers.createNewTicket(socket.id, firstName, lastName, reason, orderNumber, email, phone);
    mongoose.createNewTicket(newTicket, (err, response) => {
      if (err) {
        console.log(err);
      } else {
        console.log(response);
      }
    });

    helpers.createUser(currentUsers, firstName, socket.id); // socketId: firstName
    socket.join('defaultRoom'); // to refactor
    console.log(currentUsers);
    callback();
  });

  socket.on(events.SEND_MESSAGE, (message, senderName) => {
    const formattedMessage = helpers.createMessage(message, senderName);
    mongoose.saveMessageInTicket(helpers.ticketNumber, formattedMessage, (err, response) => {
      if (err) {
        console.log(err);
      } else {
        console.log(response);
      }
    });
    io.to('defaultRoom').emit('message', formattedMessage); // refactor
  });

  socket.on('disconnect', () => {
    mongoose.fetchByTicketId(socket.id, (err, response) => {
      if (err) {
        console.log(err);
      } else {
        helpers.prepareEmail(response.customer_info.email, response);
        console.log(response);
      }
    });
    helpers.deleteUser(currentUsers, socket.id);
    console.log(`This is who remains: ${JSON.stringify(currentUsers)}\n\n`);
  });
};
