const dgraph = require("dgraph-js");
const grpc = require("grpc");
const SERVER_ADDR = "54.194.192.127:9080";
const SERVER_CREDENTIALS = grpc.credentials.createInsecure();
const clientStub1 = new dgraph.DgraphClientStub(SERVER_ADDR, SERVER_CREDENTIALS);
const ProfilData = `uid
username,
email,
firstname,
lastname,
dob,
city,
gender,
user_pic`;
    
// Create a client.
function newClient() {
    return new dgraph.DgraphClient(clientStub1);
}

// Create data using JSON
async function createData(dgraphClient, data) {
    const txn = dgraphClient.newTxn();
    try {
        const mu = new dgraph.Mutation();
        mu.setSetJson(data);
        const assigned = await txn.mutate(mu);
        await txn.commit();
        console.log(assigned.getUidsMap());
    } finally {
        await txn.discard();
    }
}

async function getUser() {
    dgraphClient = newClient();   
    const query = `{
        random(func: has(username)) {
            ${ProfilData}
        }
    }`;
    const res = await dgraphClient.newTxn().query(query);
    const data = res.getJson();
    //data.all.forEach((person) => console.log(person));
    return (data.random);
}

async function getUserProfile(userID) {
    dgraphClient = newClient();   
    const query = `{ userProfile(func: uid(${userID})) {
            ${ProfilData},
        }
    }`;
    const res = await dgraphClient.newTxn().query(query);
    const data = res.getJson();
    return (data.userProfile[0]);
}

//Add a user
async function addUser(user) {
    return createData(newClient(), user);
}

//Get an ID from email
async function getUserID(email) {
    dgraphClient = newClient();   
    const query = `{
        getUserID(func: eq(email, "${email}")) {
            uid
        }
    }`;
    const res = await dgraphClient.newTxn().query(query);
    const data = res.getJson();
    return (data.getUserMatch[0].uid);
}


//Match 2 users
async function newMatch(uid1, uid2) {
    dgraphClient = newClient();
    const txn = dgraphClient.newTxn();
    try {
        const mu = new dgraph.Mutation();
        matchData = `${uid1} <match> ${uid2} .`;
        mu.setSetNquads(matchData);
        mu.setCommitNow(true);
        await txn.mutate(mu);
    } finally {
        await txn.discard();
    }
    return (`Match from ${uid1} to ${uid2} done`);
}

//Return all match for a user
async function getUserMatch(uid) {
    dgraphClient = newClient();   
    const query = `{ getUserLike(func: uid(${uid})) {
            match {
                ${ProfilData}
            }
        }
    }`;
    const res = await dgraphClient.newTxn().query(query);
    const data = res.getJson();
    if (data.getUserLike[0]) {
        return data.getUserLike[0].match;
    } else {
        return null;
    }
}

async function getFullMatch(uid) {
    dgraphClient = newClient();   
    const query = `{ userMatch(func: uid(${uid})) {
            match @filter(uid_in(match, ${uid})) {
            ${ProfilData}
            }
        }
    }`;
    const res = await dgraphClient.newTxn().query(query);
    const data = res.getJson();
    if (data.userMatch[0]) {
        return data.userMatch[0].match;
    } else {
        return null;
    }
}


// Drop All - discard all data and start from a clean slate.
async function dropAll(dgraphClient) {
    const op = new dgraph.Operation();
    op.setDropAll(true);
    await dgraphClient.alter(op);
}

// Set schema.
async function setSchema(dgraphClient) {
    const schema = `
        username: string @index(exact) .
        email: string @index(exact) .
        firstname: string @index(exact) .
        lastname: string @index(exact) .
    `;
    const op = new dgraph.Operation();
    op.setSchema(schema);
    await dgraphClient.alter(op);
}

// * Mise en place db + query + post serveur -> client
async function createDb() {
    //get info
    const dgraphClientStub = db.newClientStub();
    const dgraphClient = db.newClient(dgraphClientStub);
    await db.dropAll(dgraphClient);
    await db.setSchema(dgraphClient);
    // const json = await db.queryData(dgraphClient);
    // app.post('/login', (req, res) => {
    // async function makePostRequest() {
    //   res.send(json);
    // }
    // makePostRequest();
  // })
    dgraphClientStub.close();
  }

module.exports  = {
    newClient: newClient,
    dropAll: dropAll,
    setSchema: setSchema,
    createData: createData,
    createDb: createDb,
    addUser: addUser,
    getUser: getUser,
    getUserID: getUserID,
    getUserProfile: getUserProfile,
    getUserLike: getUserMatch,
    getFullMatch: getFullMatch,
    newMatch : newMatch 
}