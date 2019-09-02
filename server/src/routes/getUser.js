const router = require("express").Router();
const db = require("../db.js");

router.route('/').post((req, res) => {
    let user_nb = Math.round(Math.random() * 50);
    db.getUser().then(function (users) {
        res.send(users.all[user_nb]);
    });
});

module.exports = router;