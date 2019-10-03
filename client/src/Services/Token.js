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

export function decode(token) {
    return (jwt.decode(token, { complete: true }));
}

function isLogged() {
    return new Promise(async (res, rej) => {
        const dateNow = new Date();
        const token = localStorage.getItem('token')
        if (token) {
            verify(token)
                .then(check => {
                    if (!check) {
                        res(false);
                    } else if (check.exp < dateNow.getTime() / 1000) {
                        localStorage.removeItem('token');
                        res(false);
                    } else {
                        res(true);
                    }
                })
        }
    })
};


export { isLogged } 
