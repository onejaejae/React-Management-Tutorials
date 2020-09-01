import React from 'react';
import { post } from 'axios';

class CustomerAdd extends React.Component{
    state = {
        file : null,
        userName : '',
        birthday : '',
        gender : '',
        job : '',
        fileName : ''
    }

    handleFormSubmit = (e) => {
        e.preventDefault();
        this.addCustomer()
            .then((response) => {
                console.log(response.data);
                this.props.stateRefresh();
            });
        this.setState({
            file : null,
            userName : '',
            birthday : '',
            gender : '',
            job : '',
            fileName : ''
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
        const {file, userName, birthday, gender, job, fileName} = this.state;
        return (
            <form onSubmit={this.handleFormSubmit}>
                <h1>고객 추가</h1>
                프로필 이미지 : <input type="file" name="file" file={file}  value={fileName} onChange={this.handleFileChange} /><br />
                이름 : <input type="text" name="userName" value={userName}  onChange={this.handleValueChange} /><br />
                생년월일 : <input type="text" name="birthday" file={birthday}  onChange={this.handleValueChange} /><br />
                성별 : <input type="text" name="gender" file={gender}  onChange={this.handleValueChange} /><br />
                직업 : <input type="text" name="job" file={job}  onChange={this.handleValueChange} /><br />
                <button type="submit">추가하기</button>
            </form>
        )
    }
}

export default CustomerAdd;