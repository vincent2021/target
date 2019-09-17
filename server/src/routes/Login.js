const router = require("express").Router();
const db = require("../db.js");
const auth = require("../auth.js");

router.route("/connect").post((req, res) => {
    username = req.body.username;
    passwd = req.body.password;
    console.log("Check auth for " + username + ":" + passwd);
    auth.login(username, passwd).then(function (ret) {
        res.send(ret);
    }, (err) => {console.log(err)});
});

router.route("/register").post((req, res) => {
    console.log(req.body);
    db.addUser(req.body);
    res.send("User added to the db");
});


router.route("/userid").post((req, res) => {
    db.getUserID(req.query['email']).then(function (ret) {
        res.send(ret);
    }, (err) => {console.log(err)});
});

module.exports = router;