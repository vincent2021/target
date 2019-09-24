const nodemailer = require('nodemailer');

async function sendMail(email, subject,body) {

    // create reusable transporter object using the default Fake Email service
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'dahlia6@ethereal.email',
            pass: 'RNd1BAFjqGgdGga3u9'
        }
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@target.com', 
        to: email, 
        subject: subject, // Subject line
        text: body,
        html: `<b>${body}</b>`
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}

module.exports = {
    sendMail: sendMail
};