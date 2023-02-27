const nodemailer = require('nodemailer');
const keys = require('../keys/keys.json');

const user = keys.nodemailerAuthUser;
const pass = keys.nodemailerAuthPass;

let transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: user,
        pass: pass
    }
})

module.exports = {
    transporter: transporter
};