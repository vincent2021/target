const fs   = require('fs');
const jwt  = require('jsonwebtoken');

const privateKEY  = fs.readFileSync('./src/private.key', 'utf8');
const publicKEY  = fs.readFileSync('./src/public.key', 'utf8');

// data sent within the jwt
let payload = {
    uid: "<0x2>",
    username: "vincent2021"
   };

const signOptions = {
    expiresIn:  "12h",
    algorithm:  "RS256"
   };

const sign = (payload, signOptions) => {
    return (jwt.sign(payload, privateKEY, signOptions));
}

const verify = (token, signOptions) => {
    try {
        return jwt.verify(token, publicKEY, signOptions);
    } catch (err) {
        return false;
    }
}

const decode = (token) => {
    return (jwt.decode(token, {complete: true}));
}

module.exports = {
    sign: sign,
    verify: verify,
    decode: decode
};