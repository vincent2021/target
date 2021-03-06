const dgraph = require("dgraph-js");
const grpc = require("grpc");
const tool = require("./tool.js");
const SERVER_ADDR = 'dgraph:9080';
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
                    target,
                    text,
                    interest,
                    user_pic,
                    score`;

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

async function setNotif(uid, msg) {
    dgraphClient = newClient();
    const txn = dgraphClient.newTxn();
    try {
      const mu = new dgraph.Mutation();
      mu.setSetNquads(`<${uid}> <notif> ${msg} .`);
      mu.setCommitNow(true);
      await txn.mutate(mu);
  } finally {
      await txn.discard();
      return (txn);
  }
}

async function getNotif(userID) {
    dgraphClient = newClient();   
    const query = `{ user(func: uid(${userID})) {
            uid,
            notif
        }
    }`;
    const res = await dgraphClient.newTxn().query(query);
    const data = res.getJson();
    return (data.user[0].notif);
}


// Delete a specific picture (WIP)
async function deleteUserInfo(uid, key, url) {
    dgraphClient = newClient();
    const txn = dgraphClient.newTxn();
    try {
      const mu = new dgraph.Mutation();
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
  } finally {
      await txn.discard();
  }
}

async function addUser(user) {
    console.log("User Added.\n");
    return createData(user);
}

// Create data using JSON
async function createData(data) {
    const dgraphClient = newClient();
    const txn = dgraphClient.newTxn();
    try {
        const mu = new dgraph.Mutation();
        mu.setSetJson(data);
        mu.setCommitNow(true);
        await txn.mutate(mu);
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
        gender: string @index(term) .
        target: string @index(exact) .
        match: uid @reverse .
        dob: datetime @index(hour) .
        email: string @index(fulltext) .
        user_pic: [string] .
        city: string .
        location: geo @index(geo) .
        text: string .
        interest: [string] .
        score: int @index(int) .
        visit: uid .
        reject: uid @reverse .
        notif: [string] .
        key: string @index(exact) .
        status: bool .
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
    getUserID: getUserID,
    getUserProfile: getUserProfile,
    modifyUser: modifyUser,
    deleteUserInfo: deleteUserInfo,
    getUserPic: getUserPic,
    setLocation: setLocation,
    getNotif: getNotif,
    setNotif: setNotif
}