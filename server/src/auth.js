;
const fs = require('fs');
const jwt  = require('jsonwebtoken');
const dgraph = require("dgraph-js");
const grpc = require("grpc");
const SERVER_ADDR = "54.194.192.127:9080";
const SERVER_CREDENTIALS = grpc.credentials.createInsecure();
const clientStub1 = new dgraph.DgraphClientStub(SERVER_ADDR, SERVER_CREDENTIALS);
const geo = require("./Geo");
const mail = require("./mail");

// Create a client.
function newClient() {
    return new dgraph.DgraphClient(clientStub1);
}
async function login(body) {
    const username = body.username;
    const password = body.password;
    const user_loc = body.user_loc;
    console.log(user_loc);
    const ip = body.user_ip;
    console.log(body);
    try {
        dgraphClient = newClient();
        const query = `{
            login(func: eq(username, "${username}")) {
                uid,
                secret: checkpwd(password, "${password}"),
                score
                }
            }`;
        const res = await dgraphClient.newTxn().query(query);
        const data = res.getJson();
        console.log(data);
        if (data.login[0].secret == true) {
            const uid = data.login[0].uid;
            if (user_loc == undefined) {
                geo.getPos(uid, ip);
            } else if (ip) {
                geo.setPosFromUser(uid, ip, user_loc.lat, user_loc.lon);
            }
            token = sign(uid, username, user_loc);
            return (token);
        } else {
            return ("Wrong password");
        }
    } catch (err) {
        console.log(err);
        return "Wrong Username or DB error";
    }
}

const privateKEY  = fs.readFileSync('./src/private.key', 'utf8');
const publicKEY  = fs.readFileSync('./src/public.key', 'utf8');


const sign = (uid, username, user_loc, score) => {
    const signOptions = {
        expiresIn:  "120h",
        algorithm:  "RS256"
       };
    
    let payload = {
        uid: uid,
        username: username,
        loc: user_loc
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

async function resetPasswd(email) {
    let new_passwd =  Math.random().toString(36).substring(2, 15);
    new_passwd = "test42"
    try {
        dgraphClient = newClient();
        const query = `{
            getUID(func: eq(email, "${email}")) {
                uid
                }
            }`;
        const res = await dgraphClient.newTxn().query(query);
        const uid = res.getJson().getUID[0].uid;
        const txn = dgraphClient.newTxn();
        try {
          const mu = new dgraph.Mutation();
          mu.setSetNquads(`<${uid}> <password> "${new_passwd}" .`);
          mu.setCommitNow(true);
          await txn.mutate(mu);
          ret = mail.sendResetMail(email, new_passwd);
          return (ret);
        } finally {
            await txn.discard();
        }
    } catch (err) {
        console.log(err);
        return "Wrong email";
    }
}

module.exports = {
    sign: sign,
    verify: verify,
    decode: decode,
    login: login,
    resetPasswd: resetPasswd
};