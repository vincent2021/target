const router = require("express").Router();
const match = require("../db_match.js");
const db = require("../db.js");
const tool = require("../Tool.js");
const auth = require("../auth.js");

router.route('/new').post((req, res) => {
    const tokenInfo = auth.decode(req.headers.authorization).payload;
    const name = tokenInfo.username;
    let uid1 = tokenInfo.uid;
    if (req.query['uid1']) {
        uid1 = req.query['uid1'];
    }
    match.newMatch(uid1, req.query['uid2']).then(function (ret) {
        res.send(ret);
    }, (err) => {console.log(err)});
    db.setNotif(req.query['uid2'], `"You have been liked by ${name}"`);
});



router.route('/unlike').post((req, res) => {
    const uid1 = tokenInfo = auth.decode(req.headers.authorization).payload.uid;
    const uid2 = req.query['uid'];
    const name = tokenInfo = auth.decode(req.headers.authorization).payload.username;
    match.unMatch(uid1, uid2).then(function (ret) {
        res.send(ret);
    }, (err) => {console.log(err)});
    db.setNotif(req.query['uid2'], `"You have been unliked by ${name}"`);
});

router.route('/reject').post((req, res) => {
    const uid1 = tokenInfo = auth.decode(req.headers.authorization).payload.uid;
    const uid2 = req.query['uid'];
    match.reject(uid1, uid2).then(function (ret) {
        res.send(ret);
    }, (err) => {console.log(err)});
});

router.route('/unreject').post((req, res) => {
    const uid1 = tokenInfo = auth.decode(req.headers.authorization).payload.uid;
    const uid2 = req.query['uid'];
    match.unreject(uid1, uid2).then(function (ret) {
        res.send(ret);
    }, (err) => {console.log(err)});
});


router.route('/visit').post((req, res) => {
    const uid1 = tokenInfo = auth.decode(req.headers.authorization).payload.uid;
    const uid2 = req.query['uid'];
    const name = tokenInfo = auth.decode(req.headers.authorization).payload.username;
    match.visit(uid1, uid2).then(function (ret) {
        res.send(ret);
    }, (err) => {console.log(err)});
    db.setNotif(req.query['uid2'], `"You have been visited by ${name}"`);
});


router.route('/filterVisit').post((req, res) => {
    const uid = tokenInfo = auth.decode(req.headers.authorization).payload.uid;
    match.filterVisit(uid).then(function (ret) {
        res.send(ret);
    }, (err) => {console.log(err)});
});


router.route('/fullmatch').post((req, res) => {
    const uid = tokenInfo = auth.decode(req.headers.authorization).payload.uid;
    match.getFullMatch(uid).then(function (ret) {
        res.send(ret);
    }, (err) => {console.log(err)});
});

router.route('/smallmatch').post((req, res) => {
    const uid = tokenInfo = auth.decode(req.headers.authorization).payload.uid;
    match.getUserLike(uid).then(function (ret) {
        res.send(ret);
    }, (err) => {console.log(err)});
});

router.route('/interaction').post((req, res) => {
    match.getInteraction(req.query['uid']).then(function (ret) {
        res.send(ret);
    }, (err) => {console.log(err)});
});

//PowerQuery to match with filter
router.route('/filter').post((req, res) => {
    const token = tokenInfo = auth.decode(req.headers.authorization).payload;
    let user_loc = '[48.8967052, 2.3183661]'
    if (token.loc) {
        user_loc = `[${token.loc.lat}, ${token.loc.lon}]`;
    };
    const uid = token.uid;
    const km = req.body.range * 1000;
    const age_max = tool.toDOB(req.body.age_max);
    const age_min = tool.toDOB(req.body.age_min);
    const score_max = req.body.score_max;
    const score_min = req.body.score_min;

    match.filterUser(uid, age_min, age_max, user_loc, km, score_min, score_max).then(function (ret) {
        res.send(ret);
    });
});

module.exports = router;