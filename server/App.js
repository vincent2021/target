// DGRAPH SETUP AND PRINT (en cours...) lien : https://www.npmjs.com/package/dgraph-js
const dgraph = require("dgraph-js");
const grpc = require("grpc");

const clientStub = new dgraph.DgraphClientStub(
  "localhost:8100",
  grpc.credentials.createInsecure(),
);
const dgraphClient = new dgraph.DgraphClient(clientStub);

const p = {
  name: "Luke",
};
const mu = new dgraph.Mutation();
mu.setSetJson(p);
async function jecomprendpastrop(){
  return await txn.mutate(mu);
}
jecomprendpastrop();

const query = `query all($a: string) {
  all(func: eq(name, $a))
  {
    name
  }
}`;
const vars = { $a: "Luke" };
async function jecomprendpas(){
  return await dgraphClient.newTxn().queryWithVars(query, vars);
}
const res = jecomprendpas();
console.log(res);
const ppl = res.getJson();
console.log(`Number of people named "Alice": ${ppl.all.length}`);
ppl.all.forEach((person) => console.log(person.name));

// POST
const express = require('express');
const app = express();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/login', (req, res) => {
  console.log("test-backend")  
  var test = JSON.stringify({test : "AHHAHAHAHA"})
  res.send(test)
  console.log(res);
});

app.listen(8000, () => console.log('Example app listening on port 8000!'));