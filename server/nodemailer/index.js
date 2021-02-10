/* eslint-disable */

const nodemailer = require('nodemailer');
const secret = require('./secret.js')

const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
      user: '',
      pass: secret.password,
  },
  secure: true,
});

module.exports = {
  transporter,
}