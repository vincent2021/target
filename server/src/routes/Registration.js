const router = require("express").Router();

router.route("/").post((req, res) => {
    console.log(req.body);
    res.send('alright !');
});

module.exports = router;