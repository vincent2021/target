
const dgraph = require("dgraph-js");
const grpc = require("grpc");
 

// Create a client stub.
function newClientStub() {
    return new dgraph.DgraphClientStub("server:9080", grpc.credentials.createInsecure());
}

// Create a client.
function newClient(clientStub) {
    return new dgraph.DgraphClient(clientStub);
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
async function createData(dgraphClient) {
    // Create a new transaction.
    const txn = dgraphClient.newTxn();
    try {
        // Create data.
        const p = {
            name: "Alice",
            age: 26,
            married: true,
            loc: {
                type: "Point",
                coordinates: [1.1, 2],
            },
            dob: new Date(1980, 1, 1, 23, 0, 0, 0),
            friend: [
                {
                    name: "Bob",
                    age: 24,
                },
                {
                    name: "Charlie",
                    age: 29,
                }
            ],
            school: [
                {
                    name: "Crown Public School",
                }
            ]
        };

        // Run mutation.
        const mu = new dgraph.Mutation();
        mu.setSetJson(p);
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

module.exports  = {
    newClientStub: newClientStub,
    newClient: newClient,
    dropAll: dropAll,
    setSchema: setSchema,
    createData: createData,
    queryData: queryData
}