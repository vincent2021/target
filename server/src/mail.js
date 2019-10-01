const nodemailer = require('nodemailer');

async function sendResetMail(email, new_pwd) {

    // create reusable transporter object using the default Fake Email service
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'dahlia6@ethereal.email',
            pass: 'RNd1BAFjqGgdGga3u9'
        }
    });

    const body = "Hi buddy,\nPlease find your new password for Target app: " + new_pwd + "\nRegards, Felix Foo."

    let info = await transporter.sendMail({
        from: '"Felix Foo 👻" <foo@target.com', 
        to: email, 
        subject: "Please find your new password",
        text: body,
        html: `<b>${body}</b>`
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}

module.exports = {
    sendResetMail: sendResetMail
};