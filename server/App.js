//include db

const db = require('./src/db.js');
const Registration = require('./src/routes/Registration');
const Login = require('./src/routes/Login');
// const dgraph = require("dgraph-js");


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
app.use('/registration', Registration);
app.use('/login', Login);



// * Mise en place db + query + post serveur -> client

async function createdb() {
  //get info
  const dgraphClientStub = db.newClientStub();
  const dgraphClient = db.newClient(dgraphClientStub);
  await db.dropAll(dgraphClient);
  await db.setSchema(dgraphClient);
  await db.createData(dgraphClient);
  // const json = await db.queryData(dgraphClient);
  // app.post('/login', (req, res) => {
  // async function makePostRequest() {
  //   res.send(json);
  // }
  // makePostRequest();
// })
  dgraphClientStub.close();
}

createdb();

app.listen(8000, () => console.log('Example app listening on port 8000!'));
