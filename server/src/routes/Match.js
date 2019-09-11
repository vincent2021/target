const router = require("express").Router();
const db = require("../db.js");

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

module.exports = router;