//include db
const db = require('./db.js');
const dgraph = require("dgraph-js");

// POST
const express = require('express');
const cors = require('cors'); // plus de msg d erreur cors
const helmet = require('helmet'); // securise Express
const axios = require('axios'); // pour les requêtes http
const bodyParser = require('body-parser'); // permet d'afficher le req.body apres une requête

const app = express();
app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// recuperere un post client
async function whoisit() {
  await app.post('/newuser', (req, res, next) => {
  const data = req.body;
  console.log(data);
  console.log(data.user);
    async function createData(dgraphClient, data) {
      // Create a new transaction.
      const txn = dgraphClient.newTxn();
      try {
          // Create data.
          const p = data;

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
  createData(db.newClient(db.newClientStub()), data.user);
return data; 
})
}

whoisit().catch(err => console.log(err.message));


// * Post serveur->client

// app.post('/login', (req, res) => {
//   async function makePostRequest() {
//     const params = {
//       id: 6,
//       first_name: 'Fred',
//       last_name: 'Blair',
//       email: 'freddyb34@gmail.com'
//     }
//     console.log(res.body);
//     res.send(params);
//   }
//   makePostRequest();
// })

// * Mise en place db + query + post serveur -> client

// app.post('/login', (req, res) => {
//   console.log("test-backend")
//   async function f() {
//     //get info
//     const dgraphClientStub = db.newClientStub();
//     const dgraphClient = db.newClient(dgraphClientStub);
//     await db.dropAll(dgraphClient);
//     await db.setSchema(dgraphClient);
//     await db.createData(dgraphClient);
//     const json = await db.queryData(dgraphClient);
//     res.send(json)
//     dgraphClientStub.close();
//   };
//   f().then(() => {ß
//     console.log('YEAH');
//   }).catch((e) => {
//     console.log('NOOOO ! : ', e);
//   });
// });

app.listen(8000, () => console.log('Example app listening on port 8000!'));
