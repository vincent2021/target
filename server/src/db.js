const dgraph = require("dgraph-js");
const grpc = require("grpc");
const tool = require("./tool.js");
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
user_pic,
`;
    
// Create a client.
function newClient() {
    return new dgraph.DgraphClient(clientStub1);
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

async function filterUser(gender, age_min, age_max) {
    dgraphClient = newClient();
    const query = `{ users(func: eq(gender, "${gender}")) @filter(lt(dob, "${age_min}") AND gt(dob, "${age_max}")) {
            ${ProfilData},
        }
    }`;
    console.log(query);
    const res = await dgraphClient.newTxn().query(query);
    const data = res.getJson();
    return (data.users);
}

async function getUserPic(userID) {
    dgraphClient = newClient();   
    const query = `{ userProfile(func: uid(${userID})) {
            uid,
            user_pic
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
    return (data.getUserID[0].uid);
}


//Match 2 users
async function newMatch(uid1, uid2) {
    dgraphClient = newClient();
    const txn = dgraphClient.newTxn();
    try {
        const mu = new dgraph.Mutation();
        matchData = `<${uid1}> <match> <${uid2}> .`;
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

// Change data for a specific UID
async function modifyUser(uid, key, value) {
    dgraphClient = newClient();
    const txn = dgraphClient.newTxn();
    try {
      const mu = new dgraph.Mutation();
      mu.setSetNquads(`<${uid}> <${key}> "${value}" .`);
      mu.setCommitNow(true);
      await txn.mutate(mu);
  } finally {
      await txn.discard();
      return (key + " successfully changed");
  }
}

// Change picture list for a specific uid
async function changePics(uid, value) {
    dgraphClient = newClient();
    const txn = dgraphClient.newTxn();
    try {
      const mu = new dgraph.Mutation();
      mu.setSetNquads(`<${uid}> <user_pic> "${value}" .`);
      mu.setCommitNow(true);
      await txn.mutate(mu);
      return(txn);
  } finally {
      await txn.discard();
  }
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

// Drop All - discard all data and start from a clean slate.
async function dropAll(dgraphClient) {
    const op = new dgraph.Operation();
    op.setDropAll(true);
    await dgraphClient.alter(op);
}

// Mise en place db + query + post serveur -> client
async function createDb() {
    const dgraphClientStub = db.newClientStub();
    const dgraphClient = db.newClient(dgraphClientStub);
    await db.dropAll(dgraphClient);
    await db.setSchema(dgraphClient);
    dgraphClientStub.close();
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

module.exports  = {
    newClient: newClient,
    createData: createData,
    addUser: addUser,
    getUser: getUser,
    getUserID: getUserID,
    getUserProfile: getUserProfile,
    getUserLike: getUserMatch,
    getFullMatch: getFullMatch,
    newMatch: newMatch,
    modifyUser: modifyUser,
    changePics: changePics,
    getUserPic: getUserPic,
    filterUser: filterUser
}