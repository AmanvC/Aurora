const nodeMailer = require('../config/nodemailer');

module.exports.sendConfirmationEmail = (name, email, confirmationCode) => {
    console.log('CHECK')
    nodeMailer.transporter.sendMail({
        from: '',
        to: email,
        subject: 'Aurora - Please confirm your account',
        html: `
            <h1>Email Confirmation</h1>
            <h2>Hello ${name}</h2>
            <p>Thank you for signing up at Aurora. Please confirm your email by clicking on the following link</p>
            <a href=http://localhost:8000/confirm/${confirmationCode}> Click here</a>
            </div>
        `
    }, (err, info) => {
        if(err){
            console.log('Error in sending confirmation email: ', err);
            return;
        }
    })

}