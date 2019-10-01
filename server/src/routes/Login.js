const router = require("express").Router();
const db = require("../db.js");
const auth = require("../auth.js");
const mail = require("../mail.js");

router.route("/connect").post((req, res) => {
    const username = req.body.username;
    const passwd = req.body.password;
    auth.login(username, passwd)
        .then(function (ret) {
            res.send(ret);
        }, (err) => { console.log(err) });
});

router.route("/register").post((req, res) => {
    db.addUser(req.body);
    mail.sendMail("vincent2021@gmail.com", "Test", "Salut ma poule");
    res.send("User added to the db");
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

module.exports = router;