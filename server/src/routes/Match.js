const router = require("express").Router();
const db = require("../db.js");
const tool = require("../Tool.js");
const auth = require("../auth.js");

router.route('/new').post((req, res) => {
    console.log('Match ' + req.query['uid1'] + ' with ' + req.query['uid2']);
    db.newMatch(req.query['uid1'], req.query['uid2']).then(function (ret) {
        res.send(ret);
    }, (err) => {console.log(err)});
});

router.route('/user').post((req, res) => {
    console.log('Get match for ' + req.query['uid']);
    db.getUserLike(req.query['uid']).then(function (ret) {
        res.send(ret);
    }, (err) => {console.log(err)});
});

router.route('/fullmatch').post((req, res) => {
    console.log('Get full match for ' + req.query['uid']);
    db.getFullMatch(req.query['uid']).then(function (ret) {
        res.send(ret);
    }, (err) => {console.log(err)});
});

//PowerQuery to match with filter
router.route('/filter').post((req, res) => {
    const gender = req.body.gender;
    const age_max = tool.toDOB(req.body.age_max);
    const age_min = tool.toDOB(req.body.age_min);
    const token_loc = tokenInfo = auth.decode(req.headers.authorization).payload.loc;
    const user_loc = `[${token_loc.lat}, ${token_loc.lon}]`;
    const km = req.body.range * 1000;
    console.log(age_min + ";" + age_max + user_loc + km);
    db.filterUser(gender, age_min, age_max, user_loc, km).then(function (ret) {
        res.send(ret);
    });
});

module.exports = router;