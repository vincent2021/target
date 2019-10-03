const nodemailer = require('nodemailer');

async function sendRegisterMail(email, key, username) {

    // create reusable transporter object using the default Fake Email service
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'dahlia6@ethereal.email',
            pass: 'RNd1BAFjqGgdGga3u9'
        }
    });

    const body = "Hi " + username + ",\nPlease find activate your account with this link: http://localhost:8000/login/activate?email=" + email + "&key=" + key + "\nRegards, Felix Foo."

    let info = await transporter.sendMail({
        from: '"Felix Foo 👻" <foo@target.com', 
        to: email, 
        subject: "Please find your new password",
        text: body,
        html: `<b>${body}</b>`
    });
    ret = 'Mail sent with activation link: ' + nodemailer.getTestMessageUrl(info);
    return (ret);
}



async function sendResetMail(email, new_pwd, username) {

    // create reusable transporter object using the default Fake Email service
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'dahlia6@ethereal.email',
            pass: 'RNd1BAFjqGgdGga3u9'
        }
    });

    const body = "Hi " + username + ",\nPlease find your new password for Target app: " + new_pwd + "\nRegards, Felix Foo."

    let info = await transporter.sendMail({
        from: '"Felix Foo 👻" <foo@target.com', 
        to: email, 
        subject: "Please find your new password",
        text: body,
        html: `<b>${body}</b>`
    });
    ret = 'Mail sent with new pwd: ' + nodemailer.getTestMessageUrl(info);
    console.log(ret);
    return (ret);
}

async function sendReportMail(url, user_data) {

    // Fake smtp server
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'dahlia6@ethereal.email',
            pass: 'RNd1BAFjqGgdGga3u9'
        }
    });

    const body = "Hi admin,\nThe following user has been reported. Please take action: "
    + url + "\n -- \n All details:\n" + user_data + "\nRegards, the server."

    let info = await transporter.sendMail({
        from: '"Felix Foo 👻" <foo@target.com', 
        to: "admin@target.com", 
        subject: "A user has been reported",
        text: body,
        html: `<b>${body}</b>`
    });
    ret = 'Mail sent to admin with reported user: ' + nodemailer.getTestMessageUrl(info);
    console.log(ret);
    return (ret);
}

module.exports = {
    sendResetMail: sendResetMail,
    sendReportMail: sendReportMail,
    sendRegisterMail: sendRegisterMail
};