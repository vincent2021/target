
const Login = require('./src/routes/Login');
const User = require('./src/routes/User');
// const Login = require('./src/routes/Login');
// const dgraph = require("dgraph-js");


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
app.use('/login', Login);
app.use('/user', User);

app.listen(8000, () => console.log('Server listening on port 8000!'));
