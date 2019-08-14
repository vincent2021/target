//include db
const db = require ('./db.js')

// POST
const express = require('express')
const app = express()

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/login', (req, res) => {
  console.log("test-backend")  
  async function f(){
    
    //get info
    const dgraphClientStub = db.newClientStub();
    const dgraphClient = db.newClient(dgraphClientStub);
    await db.dropAll(dgraphClient);
    await db.setSchema(dgraphClient);
    await db.createData(dgraphClient);
    const json = await db.queryData(dgraphClient);
    res.send(json)
    dgraphClientStub.close();
  };
  f().then(() =>{
    console.log('YEAH');
  }).catch((e) =>{
    console.log('NOOOO ! : ', e);
  });
});

app.listen(8000, () => console.log('Example app listening on port 8000!'));
