const router = require("express").Router();
const match = require("../db_match.js");
const tool = require("../Tool.js");
const auth = require("../auth.js");

router.route('/new').post((req, res) => {
    match.newMatch(req.query['uid1'], req.query['uid2']).then(function (ret) {
        res.send(ret);
    }, (err) => {console.log(err)});
});

router.route('/user').post((req, res) => {
    match.getUserLike(req.query['uid']).then(function (ret) {
        res.send(ret);
    }, (err) => {console.log(err)});
});

router.route('/unlike').post((req, res) => {
    const uid1 = tokenInfo = auth.decode(req.headers.authorization).payload.uid;
    const uid2 = req.query['uid'];
    match.unMatch(uid1, uid2).then(function (ret) {
        res.send(ret);
    }, (err) => {console.log(err)});
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
    match.visit(uid1, uid2).then(function (ret) {
        res.send(ret);
    }, (err) => {console.log(err)});
});


router.route('/filterVisit').post((req, res) => {
    const uid = tokenInfo = auth.decode(req.headers.authorization).payload.uid;
    match.filterVisit(uid).then(function (ret) {
        res.send(ret);
    }, (err) => {console.log(err)});
});


router.route('/fullmatch').post((req, res) => {
    match.getFullMatch(req.query['uid']).then(function (ret) {
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
    const looking_for = req.body.gender;
    console.log(looking_for);
    const age_max = tool.toDOB(req.body.age_max);
    const age_min = tool.toDOB(req.body.age_min);

    match.filterUser(uid, looking_for, age_min, age_max, user_loc, km).then(function (ret) {
        res.send(ret);
    });
});

module.exports = router;