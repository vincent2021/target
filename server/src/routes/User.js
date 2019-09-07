const router = require("express").Router();
const db = require("../db.js");

router.route('/getUser').post((req, res) => {
    let user_nb = Math.round(Math.random() * 150);
    db.getUser().then(function (users) {
        res.send(users.all[user_nb]);
    });
});

module.exports = router;