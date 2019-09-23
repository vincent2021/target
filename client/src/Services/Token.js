const jwt  = require('jsonwebtoken');

const publicKEY  = `-----BEGIN PUBLIC KEY-----
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAIiTh6o1/9cVQCk7phAMes0M/0vapVKA
rL0/eGWIm237o536gPctT8UQtJCsb+kJn/s9PCBrK6VVdTEpnRWEhZcCAwEAAQ==
-----END PUBLIC KEY-----`;

async function verify(token) {
    const signOptions = {
        expiresIn:  "12h",
        algorithm:  "RS256"
       };
    try {
        return jwt.verify(token, publicKEY, signOptions);
    } catch (err) {
        return false;
    }
}

const decode = (token) => {
    return (jwt.decode(token, {complete: true}));
}

function isLogged(setLogon) {
    const dateNow = new Date(); 
    verify(localStorage.getItem('token')).then(res => {
       if (res === false) {
            setLogon(false);
       } else if (res.exp < dateNow.getTime() / 1000) {
           localStorage.removeItem('token');
           setLogon(false);
       } else {
           setLogon(true);
       }
    });
};

module.exports = {
    verify: verify,
    decode: decode,
    isLogged: isLogged
};