const jwt = require('jsonwebtoken');

const publicKEY = `-----BEGIN PUBLIC KEY-----
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAIiTh6o1/9cVQCk7phAMes0M/0vapVKA
rL0/eGWIm237o536gPctT8UQtJCsb+kJn/s9PCBrK6VVdTEpnRWEhZcCAwEAAQ==
-----END PUBLIC KEY-----`;

export function verify(token) {
    return new Promise((res, rej) => {
        const signOptions = {
            expiresIn: "120h",
            algorithm: "RS256"
        };
        try {
            jwt.verify(token, publicKEY, signOptions, function (err, decoded) {
                res(decoded)
            });
        } catch (err) {
            rej(false);
        }
    })
}

const decode = (token) => {
    return (jwt.decode(token, { complete: true }));
}

function isLogged() {
    return new Promise(async (res, rej) => {
        const dateNow = new Date();
        //si probleme await
        let check = await verify(localStorage.getItem('token'))
        if (check === false) {
            console.log('no token ...');
            res(false);
        } else if (check.exp < dateNow.getTime() / 1000) {
            console.log('deco token...');
            localStorage.removeItem('token');
            res(false);
        } else {
            console.log('token valid ...');
            res(true);
        }
    })
};


export { isLogged } 
