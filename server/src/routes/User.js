const router = require("express").Router();
const db = require("../db.js");
const auth = require("../auth.js");

router.route('/getUser').post((req, res) => {
    console.log(req.headers.authorization);
    auth.verify(req.headers.authorization).then(function (ret) {
        if (ret == false) {
            res.status(403).send;
        } else {
            let user_nb = Math.round(Math.random() * 150);
            db.getUser().then(function (users) {
                res.send(users[user_nb]);
            });
        }
    });
});

router.route('/profile').post((req, res) => {
    db.getUserProfile(req.query['uid'])
        .then(function (ret) {
            res.send(ret);
        })
});

router.route('/userid').post((req, res) => {
    db.getUserProfile(req.query['email']).then(function (ret) {
        res.send(ret);
    });
});

router.route('/image').post((req, res) => {
    console.log(req.body);
    res.send('got it');
});

module.exports = router;