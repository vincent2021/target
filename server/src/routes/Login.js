const router = require("express").Router();
const db = require("../db.js");
const auth = require("../auth.js");
const mail = require("../mail.js");

router.route("/connect").post((req, res) => {
    auth.login(req.body)
        .then(function (ret) {
            res.send(ret);
        }, (err) => { console.log(err)});
});

router.route("/register").post((req, res) => {
    const key = Math.random().toString(36).substring(2, 15);
    const status = false;
    req.body.user['key'] = key;
    req.body.user['status'] = status;
    db.addUser(req.body); 
    mail.sendRegisterMail(req.body.user['email'], key, status).then((ret) => {
        res.send(ret);
        console.log(ret);
    });
});

router.route("/userid").post((req, res) => {
    db.getUserID(req.query['email']).then(function (ret) {
        res.send(ret);
    }, (err) => { console.log(err) });
});

router.route("/tokeninfo").post((req, res) => {
    const tokenInfo = auth.decode(req.headers.authorization);
    res.send(tokenInfo['payload']);
});

router.route("/resetpwd").post((req, res) => {
    const email = req.query['email'];
    auth.resetPasswd(email).then((ret) =>
        res.send(ret));
});

router.route("/activate").get((req, res) => {
    const email = req.query['email'];
    const key = req.query['key'];
    auth.activate(email, key).then((ret) =>
        res.send(ret));
});

module.exports = router;