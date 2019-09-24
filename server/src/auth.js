const fs   = require('fs');
const jwt  = require('jsonwebtoken');
const dgraph = require("dgraph-js");
const grpc = require("grpc");
const SERVER_ADDR = "54.194.192.127:9080";
const SERVER_CREDENTIALS = grpc.credentials.createInsecure();
const clientStub1 = new dgraph.DgraphClientStub(SERVER_ADDR, SERVER_CREDENTIALS);
    
// Create a client.
function newClient() {
    return new dgraph.DgraphClient(clientStub1);
}

async function login(username, password) {
    try {
        dgraphClient = newClient();
        const query = `{
            login(func: eq(username, "${username}")) {
                uid,
                password
                }
            }`;
        const res = await dgraphClient.newTxn().query(query);
        const data = res.getJson();
        if (data.login[0].password == password) {
            const uid = data.login[0].uid;
            token = sign(uid, username);
            return (sign(uid, username));
        } else {
            return ("Wrong Password");
        }
    } catch (err) {
        return "Wrong Username";
    }
}

const privateKEY  = fs.readFileSync('./src/private.key', 'utf8');
const publicKEY  = fs.readFileSync('./src/public.key', 'utf8');


const sign = (uid, username) => {
    const signOptions = {
        expiresIn:  "120h",
        algorithm:  "RS256"
       };
    
    let payload = {
        uid: uid,
        username: username
       };
    
    return (jwt.sign(payload, privateKEY, signOptions));
}

async function verify(token) {
    const signOptions = {
        expiresIn:  "120h",
        algorithm:  "RS256"
       };
    try {
        return jwt.verify(token, publicKEY, signOptions);
    } catch (err) {
        return false;
    }
}

const decode = (token) => {;
    return (jwt.decode(token, {complete: true}));
}

module.exports = {
    sign: sign,
    verify: verify,
    decode: decode,
    login: login
};