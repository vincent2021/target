const express = require('express')
const app = express()

app.post('/login', (req, res) => {
  console.log("test")
  res.Header('Access-Control-Allow-Origin','*')
  
  res.send('put')
  console.log(res);
});

app.listen(8000, () => console.log('Example app listening on port 8000!'));