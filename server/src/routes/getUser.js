const router = require("express").Router();
const db = require("../db.js");

router.route("/").post((req, res) => {
    console.log(req.body);
    data = db.getUser();
    console.log(data);
    res.status(404).send('Sorry, we cannot find that!')
});

module.exports = router;