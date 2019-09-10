const router = require("express").Router();
const db = require("../db.js");

router.route("/connect").post((req, res) => {
    console.log(req.body);
    db.checkUser(req.body);
    //fonction pour verifier les nvx
    res.send('Login done');
});

router.route("/register").post((req, res) => {
    console.log(req.body);
    db.addUser(req.body);
    res.send("User added to the db");
});


router.route("/userid").post((req, res) => {
    const userID = "0x2";
    res.send(userID);
});

module.exports = router;