const router = require("express").Router();
const db = require("../db.js");
const auth = require("../auth.js");

router.route('/getUser').post((req, res) => {
    auth.verify(req.headers.authorization).then(function (ret) {
        console.log(ret);
        if (ret == false) {
            res.sendStatus(403);
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

router.route('/change').post((req, res) => {
    const tokenInfo = auth.decode(req.headers.authorization);
    const uid = tokenInfo.payload.uid;
    db.modifyUser(uid, req.query['key'], req.query['value']).then(function (ret) {
        res.send(ret);
    });
});

router.route('/changePics').post((req, res) => {
    const tokenInfo = auth.decode(req.headers.authorization);
    const uid = tokenInfo.payload.uid;
    db.changePics(uid, req.query['value']).then(function (ret) {
        res.send(ret);
    });
});

router.route('/pics').post((req, res) => {
    const tokenInfo = auth.decode(req.headers.authorization);
    const uid = tokenInfo.payload.uid;
    db.getUserPic(uid).then(function (ret) {
        picArray = ret.user_pic.split(';')
        res.send(picArray);
    });
});

router.route('/image').post((req, res) => {
    console.log(req.body);
    res.statusCode(200);
});

router.route('/filter').post((req, res) => {
    const age_min = req.query['age_min'];
    const age_max = req.query['age_max'];
    const gender = req.query['gender'];
    db.filterUser(gender, age_min, age_max).then(function (ret) {
        res.send(ret);
    });
});

module.exports = router;