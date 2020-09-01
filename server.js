const fs = require('fs');
const express = require('express');
const app = express();
const port = process.env.Port || 5000;
const bodyParser = require('body-parser');

app.use(express.json()); //express를 사용 할 경우 이와 같이 작성 해도 됨.
app.use(express.urlencoded( {extended : false } ));  //express를 사용 할 경우 이와 같이 작성 해도 됨.

const data = fs.readFileSync('./database.json'); // json 데이터를 읽는 방법 => json.parse, 데이터베이스의 정보(id, password)를 git에 올리지 않기 위해 json파일로 만든뒤 gitignore에 등록
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
  host : conf.host,
  user : conf.user,
  password : conf.password,
  database : conf.database
})

connection.connect();

let multer = require('multer'); //multer 라이브러리는 프론트로부터 받은 파일에 대한 처리를 할 수 있도록 도와줍니다.
let upload = multer({dest : './upload'});

app.get('/api/customers', (req, res)=>{ 
   connection.query('SELECT * FROM management WHERE isDeleted=0', (err, customers) => { // 삭제되지 않은 것만 가져와야 하기 때문에 isDeleted가 0인 것만 가져온다
     if(err){
       throw err;
     } 
     res.send(customers);
   })
})
 
app.use('/image', express.static('./upload')); // 가상 경로를 사용한 경우, 사용자가 public 디렉터리에 있는 파일들에 접근하려면 다음과 같이 접근해야 합니다. 
                                                        // app.use('/static', express.static('public')); 
                                                        //http://localhost:3000/static/images/kitten.jpg

//multer 미들웨어를 등록하면 요청 객체( req )에 file, files 객체가 추가됩니다.
//ile 또는 files 객체에는 form으로 업로드 된 파일들을 갖고있습니다.
//upload의 single 메서드는 하나의 이미지를 업로드할 때 사용
app.post('/api/customers', upload.single('image'), (req, res) => { 
  const body = req.body;
  let image = '/image/' + req.file.filename;
  connection.query(`INSERT INTO management (image, name, birthday, gender, job, createDate, isDeleted) VALUES (?, ?, ?, ?, ?, now(), 0)`, [image, body.name, body.birthday, body.gender, body.job], (err, customers) => {
    if(err){
      throw err;
    }
    res.send(customers);  
  })
})  

app.delete('/api/customers/:id', (req, res) => {
  let id = req.params.id;
  connection.query(`UPDATE management SET isDeleted = 1 WHERE ID = ?`, [ id ], (err, data) => {
    if(err){
      throw err;
    }
    res.send(data);
  })
})

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})