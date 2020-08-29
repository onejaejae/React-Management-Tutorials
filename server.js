const fs = require('fs');
const express = require('express');
const app = express();
const port = process.env.Port || 5000;
const bodyParser = require('body-parser');

app.use(express.json()); 
app.use(express.urlencoded( {extended : false } ));

const data = fs.readFileSync('./database.json'); //json 데이터를 읽는 방법 => json.parse
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
  host : conf.host,
  user : conf.user,
  password : conf.password,
  database : conf.database
})

connection.connect();

app.get('/api/customers', (req, res)=>{ 
   connection.query('SELECT * FROM management', (err, customers) => {
     if(err){
       throw err;
     }
     console.log(customers);
     res.send(customers);
   })
})
 
app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})