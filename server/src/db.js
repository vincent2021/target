const dgraph = require("dgraph-js");
const grpc = require("grpc");
const SERVER_ADDR = "54.194.192.127:9080";
const SERVER_CREDENTIALS = grpc.credentials.createInsecure();
const clientStub1 = new dgraph.DgraphClientStub(
    SERVER_ADDR,
    SERVER_CREDENTIALS
    );

// Create a client.
function newClient() {
    return new dgraph.DgraphClient(clientStub1);
}

// Drop All - discard all data and start from a clean slate.
async function dropAll(dgraphClient) {
    const op = new dgraph.Operation();
    op.setDropAll(true);
    await dgraphClient.alter(op);
}

// Set schema.
async function setSchema(dgraphClient,) {
    const schema = `
        name: string @index(exact) .
        age: int .
        married: bool .
        loc: geo .
        dob: datetime .
    `;
    const op = new dgraph.Operation();
    op.setSchema(schema);
    await dgraphClient.alter(op);
}

// Create data using JSON.
async function createData(dgraphClient, data) {
    // Create a new transaction.
    const txn = dgraphClient.newTxn();
    try {
        const mu = new dgraph.Mutation();
        mu.setSetJson(data);
        const assigned = await txn.mutate(mu);
        await txn.commit();

        // Get uid of the outermost object (person named "Alice").
        // Assigned#getUidsMap() returns a map from blank node names to uids.
        // For a json mutation, blank node names "blank-0", "blank-1", ... are used
        // for all the created nodes.
        
    } finally {
        await txn.discard();
    }
}

async function getUser() {
    dgraphClient = newClient();   
    const query = `{
        all(func: has(username)) {
            username,
            firstname,
            lastname,
            dob,
            city,
            gender,
            user_pic
        }
    }`;
    const res = await dgraphClient.newTxn().query(query);
    const data = res.getJson();
    //data.all.forEach((person) => console.log(person));
    return (data);
}

//Add a user
async function addUser(user) {
    return createData(newClient(), user);
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
    getUser: getUser
}