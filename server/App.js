const Login = require('./src/routes/Login');
const User = require('./src/routes/User');
const Match = require('./src/routes/Match');
const Upload = require('./src/routes/Upload');
const auth = require("./src/auth.js");

const express = require('express');
const cors = require('cors'); // plus de msg d erreur cors
const helmet = require('helmet'); // securise Express
const bodyParser = require('body-parser'); // permet d'afficher le req.body apres une requête

const app = express();
app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/login', Login);
app.use(express.static('public'));

//Proctected API
app.use('/user', function (req, res, next) {
  auth.verify(req.headers.authorization).then(function (ret) {
    if (ret == false) {
        res.sendStatus(403);
    } else {
      next();
}})}, User);

app.use('/match', function (req, res, next) {
  auth.verify(req.headers.authorization).then(function (ret) {
    if (ret == false) {
        res.sendStatus(403);
    } else {
      next();
}})}, Match);

app.use('/upload', function (req, res, next) {
  auth.verify(req.headers.authorization).then(function (ret) {
    if (ret == false) {
        res.sendStatus(403);
    } else {
      next();
}})}, Upload);

const server = app.listen(8000, () => console.log('Backend started and listening on port 8000!'));
