const jwt = require('jsonwebtoken');

const publicKEY = `-----BEGIN PUBLIC KEY-----
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAIiTh6o1/9cVQCk7phAMes0M/0vapVKA
rL0/eGWIm237o536gPctT8UQtJCsb+kJn/s9PCBrK6VVdTEpnRWEhZcCAwEAAQ==
-----END PUBLIC KEY-----`;

async function verify(token) {
    const signOptions = {
        expiresIn: "120h",
        algorithm: "RS256"
    };
    try {
        return jwt.verify(token, publicKEY, signOptions);
    } catch (err) {
        return false;
    }
}

const decode = (token) => {
    return (jwt.decode(token, { complete: true }));
}

const isLogged = () => {
    const dateNow = new Date();
    verify(localStorage.getItem('token'))
        .then(res => {
            if (res === false) {
                console.log('no token ...');
                return false;
            } else if (res.exp < dateNow.getTime() / 1000) {
                console.log('deco token...');
                localStorage.removeItem('token');
                return false;
            } else {
                console.log('token valid ...');
                return true;
            }
        })
        .catch(err => {
            console.log('fail ...' + err);
        });
    console.log('fail ...');
};

const killToken = () => {
    verify(localStorage.getItem('token'))
        .then(res => {
            if (res) {
                console.log("Logout");
                localStorage.removeItem('token');
                return false;
            }
        })
};


export { killToken, isLogged }
