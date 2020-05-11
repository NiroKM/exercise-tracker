import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component{

    constructor(props){
        super(props);

        this.state={
            username:"",
        }
    }

    onChangeUsername=(e)=>{
        this.setState({
            username:e.target.value
        })
    }


    onSubmit=(e)=>{
        e.preventDefault();

        const user={
            username:this.state.username,
        }

        console.log(user);

        axios.post("http://localhost:5000/users/add",user)
            .then(result=>console.log(result.data));
                

        this.setState({
            username:''        
        })
    }

    render(){
        return(
            <div>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username:</label>
                        <input type="text" 
                            required
                            className="form-control" 
                            value={this.state.username} 
                            onChange={this.onChangeUsername}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button> 
                </form>
            </div>
        )
    }
}