/* eslint-disable */

const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect('mongodb://localhost/EZChat', { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;

connection.on('error', console.error.bind(console, 'database/index.js: MongoDB connection error'));
connection.once('open', () => {
  console.log('models/index.js: Mongoose is connected to server!');
});

/*-----------------------------------------------------------*/
const ticketSchema = new Schema({
  ticket_id: String,
  priority: { type: String, default: 'low' }, // low, medium, high
  created: { type: Date, default: Date.now },
  last_updated: { type: Date, default: Date.now }, // when was this ticket last updated?
  closed: { type: Boolean, default: false },
  employee_id: String,
  customer_info: {
    customer_id: String,
    first_name: String,
    last_name: String,
    email: String,
    phone: Number,
  },
  complaint: String,
  order_number: String,
  messages: [{
    message_id: String,
    timestamp: { type: Date, default: Date.now },
    text: String,
    sender: String, // Future refactor: boolean. 0 for employee, 1 for customer
  }],
});

const Ticket = mongoose.model('Ticket', ticketSchema);

const createNewTicket = (ticket, callback) => {
  console.log('Mongo: Got your ticket! Inserting now 😊');
  return Ticket.create(ticket)
    .then((response) => callback(null, response))
    .catch((err) => callback(err));
};

const saveMessageInTicket = (ticketNumber, messageObject, callback) => {
  // console.log('Mongo: got your message object! ', messageObject);
  return Ticket.updateOne({ ticket_id: ticketNumber }, { $push: { messages: messageObject } })
    .then((response) => callback(null, response))
    .catch((err) => callback(err));
};

const fetchByTicketId = (ticketId, callback) => {
  return Ticket.findOne({ ticket_id: ticketId })
    .then((response) => callback(null, response))
    .catch((err) => callback(err));
}

/*----------------------------------------------------*/
module.exports = {
  createNewTicket,
  saveMessageInTicket,
  fetchByTicketId,
  connection,
};
