const router = require("express").Router();
const db = require("../db.js");
const auth = require("../auth.js");

router.route('/getUser').post((req, res) => {
    if (auth.verify(req.headers.authorization)) {
        let user_nb = Math.round(Math.random() * 150);
        db.getUser().then(function (users) {
            res.send(users[user_nb]);
        });
    } else {
        res.statusCode(403);
    }
});

router.route('/profile').post((req, res) => {
    db.getUserProfile(req.query['uid']).then(function (ret) {
        res.send(ret);
    });
});

router.route('/userid').post((req, res) => {
    db.getUserProfile(req.query['email']).then(function (ret) {
        res.send(ret);
    });
});

module.exports = router;