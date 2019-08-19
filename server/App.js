//include db
const db = require('./db.js');

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


// recuperée un post client
async function whoisit(){
  await app.post('/newuser', (req, res, next) => {
  return console.log(req.body);
  })
}
whoisit().catch(err => console.log(err.message));


// Post serveur->client

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

// Mise en place db + query + post serveur -> client

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
