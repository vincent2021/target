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
                    location,
                    gender,
                    user_pic`;

async function getUser() {
    dgraphClient = newClient();   
    const query = `{
        random(func: has(firstname)) {
            ${ProfilData}
        }
    }`;
    const res = await dgraphClient.newTxn().query(query);
    const data = res.getJson();
    //data.all.forEach((person) = console.log(person));
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

async function filterUser(gender, age_min, age_max, user_loc, km) {
    dgraphClient = newClient();
    const query = `{ users(func: eq(gender, "${gender}"))
    @filter(near(location, ${user_loc}, ${km})
    AND lt(dob, "${age_min}")
    AND gt(dob, "${age_max}"))
        {
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
    return (data);
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
        matchData = `${uid1} match ${uid2} .`;
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
      return (txn);
  }
}

// Delete a specific picture (WIP)
async function deleteUserInfo(uid, key, url) {
    dgraphClient = newClient();
    const txn = dgraphClient.newTxn();
    try {
      const mu = new dgraph.Mutation();
      console.log(`<${uid}> <${key}> "${url}" .`);
      mu.setDelNquads(`<${uid}> <${key}> "${url}" .`);
      mu.setCommitNow(true);
      await txn.mutate(mu);
      return(txn);
  } finally {
      await txn.discard();
  }
}

async function setLocation(uid, city, lat, lon) {
    dgraphClient = newClient();
    const txn = dgraphClient.newTxn();
    try {
        const mu = new dgraph.Mutation();
        jsonData = {
            uid: uid,
            city: city,
            location: `{
                'type': 'Point',
                'coordinates': [${lat}, ${lon}]
            }`
        };
        mu.setSetJson(jsonData);
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
        await txn.mutate(mu);
        await txn.commit();
    } finally {
        await txn.discard();
    }
}

// Create a client.
function newClient() {
    return new dgraph.DgraphClient(clientStub1);
}

async function createDb() {
    const dgraphClient = newClient();
    await dropAll(dgraphClient);
    await setSchema(dgraphClient);
  }

  // Delete the DB
async function dropAll(dgraphClient) {
    const op = new dgraph.Operation();
    op.setDropAll(true);
    await dgraphClient.alter(op);
}

async function setSchema(dgraphClient) {
    const schema = `
        username: string @index(exact) .
        firstname: string @index(fulltext) .
        lastname: string @index(fulltext) .
        name: string @index(fulltext) .
        password: password .
        gender: string @index(exact) .
        match: uid @reverse .
        dob: datetime @index(hour) .
        email: string @index(fulltext) .
        user_pic: [string] .
        city: string .
        location: geo @index(geo) .
    `;
    const op = new dgraph.Operation();
    op.setSchema(schema);
    await dgraphClient.alter(op);
}

module.exports  = {
    createDb: createDb,
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
    deleteUserInfo: deleteUserInfo,
    getUserPic: getUserPic,
    filterUser: filterUser,
    setLocation: setLocation
}