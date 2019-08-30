const dgraph = require("dgraph-js");
const grpc = require("grpc");
const SERVER_ADDR = "server:9080";
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
        // Run mutation.
        const mu = new dgraph.Mutation();
        mu.setSetJson(data);
        const assigned = await txn.mutate(mu);

        // Commit transaction.
        await txn.commit();

        // Get uid of the outermost object (person named "Alice").
        // Assigned#getUidsMap() returns a map from blank node names to uids.
        // For a json mutation, blank node names "blank-0", "blank-1", ... are used
        // for all the created nodes.
        
    } finally {
        // Clean up. Calling this after txn.commit() is a no-op
        // and hence safe.
        await txn.discard();
    }
}

// Query for data.
async function queryData(dgraphClient) {
    // Run query.    
    const query = `query all($a: string) {
        all(func: eq(name, $a)) {
            uid
            name
            age
            married
            loc
            dob
            friend {
                name
                age
            }
            school {
                name
            }
        }
    }`;
    const vars = { $a: "Alice" };
    const res = await dgraphClient.newTxn().queryWithVars(query, vars);
    const ppl = res.getJson();
    // ppl.all.forEach((person) => console.log(person));
    return ppl.all[0];
    // send result

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
    queryData: queryData,
    createDb: createDb,
    addUser: addUser
}