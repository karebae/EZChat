/* eslint-disable */

const nodemailer = require('nodemailer');
const secret = require('./secret.js')


// The outgoing SMTP server, smtp.gmail.com , requires TLS. Use port 465,or port 587 if your client begins with plain text before issuing the STARTTLS command

const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
      user: 'kaizawa77@gmail.com',
      pass: secret.password,
  },
  secure: true, // upgrades later with STARTTLS -- change this based on the PORT
});

module.exports = {
  transporter,
}