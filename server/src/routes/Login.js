const router = require("express").Router();

router.route("/").post((req, res) => {
    console.log(req.body);
    //fonction pour verifier les logins
    res.send('alright !');
});

module.exports = router;