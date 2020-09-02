import React from 'react';
import { post } from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    hidden : {
        display : 'none'
    }
});
class CustomerAdd extends React.Component{
    state = {
        file : null,
        userName : '',
        birthday : '',
        gender : '',
        job : '',
        fileName : '',
        open : false
    }

    handleClickOpen = () => {
        this.setState({
            open : true
        })
    }

    handleClose = () => {
        this.setState({
            file : null,
            userName : '',
            birthday : '',
            gender : '',
            job : '',
            fileName : '',
            open : false
        })
    }

    handleFormSubmit = (e) => {
        e.preventDefault();

        this.addCustomer()
            .then((response) => {
                console.log(response.data);
                this.props.stateRefresh(); // 비동기적으로 처리되기 때문에 데이터를 보낸 뒤 stateRefresh()를 실행해야 한다.
            });

        this.setState({
            file : null,
            userName : '',
            birthday : '', 
            gender : '',
            job : '',
            fileName : '',
            open : false
        })

    }

    handleFileChange = (e) => {
        console.log(e.target.files);
       this.setState({
           file : e.target.files[0],
           fileName : e.target.value
       })
    }

    handleValueChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value // event.target.name은 해당 input의 name을 가리킨다. event.target.value은 해당 input의 vlaue을 가리킨다.
        })
    }

    addCustomer = () => {
        const url = '/api/customers';
        const formData = new FormData(); // FormData 는 <form> 과 같은 효과를 가져다주는 key/value 가 저장되는 객체이다.
        formData.append('image', this.state.file);
        formData.append('name', this.state.userName);
        formData.append('birthday', this.state.birthday);
        formData.append('gender', this.state.gender);
        formData.append('job', this.state.job);
        const config = {
            headers : {
                'content-type' : 'multipart/form-data'  //전달하고자 하는 데이터에 파일이 포함되어 있을때 설정해줘야 하는 요소 중 하나.
            }
        }   
        return post(url, formData, config) // axios에 포함 되어 있는 post 라이브러리를 사용해 해당 url의 formdata를 환경 설정에 맞게 서버로 데이터를 보낼 수 있도록 해줌.
    }

    render(){
        const {file, userName, birthday, gender, job, fileName, open} = this.state;
        const { classes } = this.props;
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    고객 추가하기
                </Button>
                <Dialog open={ open } onClose={this.handleClose}>
                    <DialogTitle>고객 추가</DialogTitle>
                    <DialogContent>
                        <input type="file" className={ classes.hidden } accept="image/*" id="raised-button-file" file={file}  value={fileName} onChange={this.handleFileChange} />
                        <label htmlFor="raised-button-file">
                            <Button variant="contained" color="primary" component="span" name="file">
                                {fileName === "" ? '프로필 이미지 선택' : fileName}
                            </Button>
                        </label>
                        <br />
                        <TextField type="text" label="이름" name="userName" value={userName}  onChange={this.handleValueChange} /><br />
                        <TextField type="text" label="생년월일" name="birthday" file={birthday}  onChange={this.handleValueChange} /><br />
                        <TextField type="text" label="성별" name="gender" file={gender}  onChange={this.handleValueChange} /><br />
                        <TextField type="text" label="직업" name="job" file={job}  onChange={this.handleValueChange} /><br />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>
                            추가
                        </Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClose}>
                            닫기
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(CustomerAdd);