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

app.post('/', (req, res, next) => {
  console.log(req.body);
})

async function makeGetRequest() {
  let res = await axios.get('http://localhost:3000/req/');
  let data = res.data;
  console.log(data);
}
makeGetRequest();






// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

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
