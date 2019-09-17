const router = require("express").Router();
const db = require("../db.js");
const auth = require("../auth.js");

router.route("/connect").post((req, res) => {
    console.log(req.body);
    auth.checkUser(req.body);
    //fonction pour verifier les nvx
    res.send('Login done');
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