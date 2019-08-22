import React from 'react';
import ReactDOM from 'react-dom';
import './style/Index.css';
import App from './App';
import Match from './Components/Match';
// import axios from 'axios';

// * recuperer un post du serveur

// async function makeGetRequest() {
//     const rep = await axios.post('http://localhost:8000/login')
//     return console.log(rep.data);
// }
// makeGetRequest();

ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<Match />, document.getElementById('match'));