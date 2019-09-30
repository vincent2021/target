const router = require("express").Router();
const db = require("../db.js");
const auth = require("../auth.js");

router.route('/getUser').post((req, res) => {
    let user_nb = Math.round(Math.random() * 50);
    db.getUser().then(function (users) {
    res.send(users[user_nb]);
    });
});


router.route('/profile').post((req, res) => {
    db.getUserProfile(req.query['uid'])
        .then(function (ret) {
            res.send(ret);
        })
});


router.route('/myprofile').post((req, res) => {
    console.log(req.headers.authorization);
    const tokenInfo = auth.decode(req.headers.authorization);
    const uid = tokenInfo.payload.uid;
    db.getUserProfile(uid)
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

router.route('/setLocation').post((req, res) => {
    console.log(req.body);
    const uid = req.query['uid'];
    const city = req.body.city;
    const lat = req.body.latitude;
    const lon = req.body.longitude;
    db.setLocation(uid, city, lat, lon).then(function (ret) {
        res.send(ret);
    });
});

router.route('/pics').post((req, res) => {
    db.getUserPic(req.query['uid']).then((ret) => {
        console.log(ret.user_pic);
        res.send(ret);
    });
});

router.route('/image').post((req, res) => {
    console.log(req.body);
    res.statusCode(200);
});


module.exports = router;