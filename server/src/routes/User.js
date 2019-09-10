const router = require("express").Router();
const db = require("../db.js");

router.route('/getUser').post((req, res) => {
    let user_nb = Math.round(Math.random() * 150);
    db.getUser().then(function (users) {
        res.send(users[user_nb]);
    });
});


router.route('/profile').post((req, res) => {
    console.log(req.query['uid']);
    db.getUserProfile(req.query['uid']).then(function (ret) {
        res.send(ret);
    });
});

module.exports = router;