import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './App';
import axios from 'axios';



async function makePostRequest() {

    const params = {
        id: 6,
        first_name: 'Fred',
        last_name: 'Blair',
        email: 'freddyb34@gmail.com'
      }
  
    let res = await axios.post('http://localhost:8000/', params);
  
    console.log(res.data);
  }
  
  makePostRequest();

ReactDOM.render(<App />, document.getElementById('root'));