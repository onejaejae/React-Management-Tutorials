import React from 'react';
import './App.css';
import Customer from './components/Customer';

const customers = [
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
]

function App() {
  return ( 
    customers.map(customer => 
      <Customer 
        key={customer.id}
        id={customer.id}
        image={customer.image}
        name={customer.name}
        birthday={customer.birthday}
        gender={customer.gender}
        job={customer.job}
      />)
  );
}

export default App;
