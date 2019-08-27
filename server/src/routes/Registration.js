const router = require("express").Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

async function checkUser(username, password) {
    //... fetch user from a db etc.
    const match = await bcrypt.compare(password, user.passwordHash);
    if (match) {
        //login
    }
    //...
}

router.route("/").post((req, res) => {
    console.log(req.body);
    // bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    //     console.log(hash);
    //   });
    res.send('alright !');
});

module.exports = router;