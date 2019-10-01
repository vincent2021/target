const fs = require('fs');
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

const IPGeolocationAPI = require('ip-geolocation-api-javascript-sdk');
const GeolocationParams = require('ip-geolocation-api-javascript-sdk/GeolocationParams.js');

function getPos(token) {
        const uid = decode(token).payload.uid;
        const api_key = 'a8df2c6b5c02482baeae3fb17c70c98b';
        const api = new IPGeolocationAPI(api_key, false); 
        const params = new GeolocationParams(); 
        params.setFields('city, latitude, longitude');
        const handleResponse = (json) => {
            axios.post(`/user/setLocation?uid=${uid}`, json).then((res) => {})
        }
        return(api.getGeolocation(handleResponse, params));
}

async function login(username, password, ip) {
    try {
        dgraphClient = newClient();
        const query = `{
            login(func: eq(username, "${username}")) {
                uid,
                secret: checkpwd(password, "${password}")
                }
            }`;
        const res = await dgraphClient.newTxn().query(query);
        const data = res.getJson();
        if (data.login[0].secret == true) {
            const uid = data.login[0].uid;
                token = sign(uid, username);
            return (token);
        } else {
            return ("Wrong Password");
        }
    } catch (err) {
        console.log(err);
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