const express = require('express');
const app = express();
const port = process.env.Port || 5000;
const bodyParser = require('body-parser');

app.use(express.json()); 
app.use(express.urlencoded( {extended : false } ));

app.get('/api/customers', (req, res)=>{ 
    res.send([  //배열 데이터는 json 형식으로 반환
        {
          id : 1,
          image : 'https://placeimg.com/64/64/any',
          name : '홍길동',
          birthday : 970924,
          gender : '남자',
          job : '학생'
        },
        {
          id : 2,
          image : 'https://placeimg.com/64/64/2',
          name : '김철수',
          birthday : 950420,
          gender : '남자',
          job : '프로그래머'
        },
        {
          id : 3,
          image : 'https://placeimg.com/64/64/3',
          name : '이순신',
          birthday : 910212,
          gender : '남자',
          job : '데이터분석가'
        }
      ]);
})
 
app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})