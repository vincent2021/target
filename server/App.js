
const Login = require('./src/routes/Login');
const User = require('./src/routes/User');
const Match = require('./src/routes/Match');
const Upload = require('./src/routes/Upload');

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
app.use('/user', User);
app.use('/match', Match);
app.use('/upload', Upload);
app.use(express.static('public'));

const server = app.listen(8000, () => console.log('Server listening on port 8000!'));

//Mise en place du socket  pour le chat et notification
const io = require('socket.io')(server);
io.on('connection', function (socket) {
  socket.on('disconnect', function() {
  });
  socket.emit('info', "Hello socket");
});