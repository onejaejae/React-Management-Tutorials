import React from 'react';

class CustomerDelete extends React.Component{
    deleteCustomer(id){
        const url = 'api/customers/' + id;
        fetch(url, {
            method : 'DELETE'
        });
        this.props.stateRefresh();
    }
    
    render(){
        const { id } = this.props;
        return(
            <button onClick={(e) => this.deleteCustomer(id)}>삭제</button>
        )
    }
}

export default CustomerDelete;