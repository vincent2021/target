const router = require("express").Router();
const db = require("../db.js");
const auth = require("../auth.js");
const mail = require("../mail.js");
const match = require("../db_match.js");


router.route('/getUser').post((req, res) => {
    let user_nb = Math.round(Math.random() * 50);
    db.getUser().then(function (users) {
    res.send(users[user_nb]);
    });
});


router.route('/profile').post((req, res) => {
    const myuid = auth.decode(req.headers.authorization).payload.uid;
    db.getUserProfile(req.query['uid'])
        .then(function (ret) {
            res.send(ret);
        })
    match.visit(myuid, req.query['uid']);
});


router.route('/myprofile').post((req, res) => {
    const uid = auth.decode(req.headers.authorization).payload.uid;
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
    const uid = auth.decode(req.headers.authorization).payload.uid;
    db.modifyUser(uid, req.query['key'], req.query['value']).then(function (ret) {
        res.send(ret);
    });
});

router.route('/modifyInfo').post((req, res) => {
    const uid = auth.decode(req.headers.authorization).payload.uid;
    req.body['uid'] = uid;
    db.createData(req.body).then(function (ret) {
        res.send("Info modified");
    });
});

router.route('/changePics').post((req, res) => {
    const uid = auth.decode(req.headers.authorization).payload.uid;
    db.changePics(uid, req.query['value']).then(function (ret) {
        res.send(ret);
    });
});

router.route('/getNotif').post((req, res) => {
    const uid = auth.decode(req.headers.authorization).payload.uid;
    db.getNotif(uid).then(function (ret) {
        res.send(ret);
    });
});

router.route('/setNotif').post((req, res) => {
    const uid = auth.decode(req.headers.authorization).payload.uid;
    db.setNotif(uid, req.query['msg']).then(function (ret) {
        res.send(ret);
    });
});

router.route('/setLocation').post((req, res) => {
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
        res.send(ret);
    });
});

router.route('/delpic').post((req, res) => {
    const uid = auth.decode(req.headers.authorization).payload.uid;
    db.deleteUserInfo(uid, "user_pic", req.body.img).then((ret) => {
        if (ret.mutated == true) {
            res.send("Picture Deleted");
        } else {
            res.send("DB error");
        }
    });
});

router.route('/delpic_admin').post((req, res) => {
    db.deleteUserInfo(req.query['uid'], "user_pic", req.query['url']).then((ret) => {
        if (ret.mutated == true) {
            res.send("Picture Deleted");
        } else {
            res.send("DB error");
        }
    });
});

router.route('/reportuser').post((req, res) => {
    const uid2 = auth.decode(req.headers.authorization).payload.uid;
    uid = req.query['uid'];
    db.getUserProfile(uid)
        .then((ret) => {
            url = `http://localhost:3000/user/${uid}`
            mail.sendReportMail(url, JSON.stringify(ret)).then(preview =>{
                res.send(preview);
            });
            
        })
    match.unMatch(uid2, uid);
    match.reject(uid2, uid);
});

module.exports = router;