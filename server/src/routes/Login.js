const router = require("express").Router();
const db = require("../db.js");

router.route("/connect").post((req, res) => {
    console.log(req.body);
    db.checkUser(req.body);
    //fonction pour verifier les nvx
    res.send('alright !');
});

const bcrypt = require('bcrypt');
const saltRounds = 10;

async function checkUser(username, password) {
    //... fetch user from a db etc.
    const match = await bcrypt.compare(password, user.passwordHash);
    if (match) {
        //login
    }
    //...
}

router.route("/register").post((req, res) => {
    res.send(req.body);
});


module.exports = router;