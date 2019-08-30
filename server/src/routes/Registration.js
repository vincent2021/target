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

function hashPassword() {
        router.route("/").post(async (req, res) => {
            await bcrypt.hash(req.body.user.password, saltRounds, function (err, hash) {
                req.body.user.password = hash;
                console.log(req.body.user);
                //renvoyer la request ici 
                console.log('Request posted !')
            })
        })
}

hashPassword();

module.exports = router;