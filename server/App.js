const express = require('express')
const app = express()

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/login', (req, res) => {
  console.log("test-backend")  
  res.send('SalutServeur')
  console.log(res);
});

app.listen(8000, () => console.log('Example app listening on port 8000!'));