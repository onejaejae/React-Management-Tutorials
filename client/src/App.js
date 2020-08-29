import React from 'react';
import './App.css';
import Customer from './components/Customer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = theme => ({
  root : {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX : "auto"
  },
  table : {
    minWidth : 1080
  },
  progress : {
    margin : theme.spacing.unit * 2
  }
})



class App extends React.Component {
  state = {
    customers : "",
    completed : 0
  }

componentDidMount(){
  this.timer = setInterval(this.progress, 20);
  this.callApi()
    .then(data => this.setState({customers : data}))
    .catch(err => console.log(err));
}

callApi = async () => {
  const response = await fetch('/api/customers');
  const body = await response.json();
  return body;
}

progress = () => {
  const {completed} = this.state;
  this.setState({completed : completed >= 100 ? 0 : completed + 1});
}

  render(){
    const { classes } = this.props;
    const { customers } = this.state;
    return ( 
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>번호</TableCell>
              <TableCell>이미지</TableCell>
              <TableCell>이름</TableCell>
              <TableCell>생년월일</TableCell>
              <TableCell>성별</TableCell>
              <TableCell>직업</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
                {customers ? customers.map(customer =>   //async 이기 때문에 customers가 비어있을 수 있으므로 삼항연산자를 사용!
                <Customer 
                  key={customer.id}
                  id={customer.id}
                  image={customer.image}
                  name={customer.name}
                  birthday={customer.birthday}
                  gender={customer.gender}
                  job={customer.job}
                />
              ) : 
              <TableRow>
                  <TableCell colSpan="6" align="center">
                    <CircularProgress className={classes.progress} variant="determinate" value={this.state.completed}></CircularProgress>
                  </TableCell>
              </TableRow>
              } 
          </TableBody>
        </Table>
      </Paper>
    )
  }

}

export default withStyles(styles)(App);
