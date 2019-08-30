const router = require("express").Router();
const db = require("../db.js");

router.route("/").post((req, res) => {
    console.log(req.body);
    db.checkUser(req.body);
    //fonction pour verifier les nvx
    res.send('alright !');
});

module.exports = router;