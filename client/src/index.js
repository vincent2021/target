import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import App from './App';
    
const data = {
    name: 'fefe'
};

const request = {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
};
  
fetch('http://localhost:8000/login', request).then((res) => {
    res.json().then((json) => {
        console.log(json)
    })
});

ReactDOM.render(<App />, document.getElementById('root'));

