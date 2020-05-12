import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateExercise extends Component{

    constructor(props){
        super(props);

        this.state={
            username:"",
            description:"",
            duration:0,
            date:new Date(),
            users:[]
        }
    }

    componentDidMount=()=>{
        axios.get("https://mern-exercise.herokuapp.com/users/")
            .then(response=>{
                if(response.data.length>0){
                    this.setState({
                        users:response.data.map((user)=>user.username),
                        username:response.data[0].username
                    })
                }
            })
    }

    onChangeUsername=(e)=>{
        this.setState({
            username:e.target.value
        })
    }

    onChangeDescription=(e)=>{
        this.setState({
            description:e.target.value
        })
    }

    onChangeDuration=(e)=>{
        this.setState({
            duration:e.target.value
        })
    }

    onChangeDate=(ndate)=>{
        this.setState({
            date: ndate
        })
    }


    onSubmit=(e)=>{
        e.preventDefault();

        const exercise={
            username:this.state.username,
            description:this.state.description,
            duration:this.state.duration,
            date:this.state.date
        }

        console.log(exercise);

        axios.post("https://mern-exercise.herokuapp.com/exercise/add",exercise)
            .then(res=>console.log(res.data));

        window.location='/';
    }

    render(){
        return(
            <div>
                <h3>Create New Exercise Log</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username:</label>
                        <select ref="userInput"
                                required
                                className="form-control"
                                value={this.state.username}
                                onChange={this.onChangeUsername}>
                                    {
                                        this.state.users.map(user=>{
                                            return <option
                                                key={user}
                                                value={user}
                                            > {user} </option>;
                                        })
                                    }
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Decription:</label>
                        <input type="text" 
                            required
                            className="form-control" 
                            value={this.state.description} 
                            onChange={this.onChangeDescription}/>
                    </div>
                    <div className="form-group">
                        <label>Duration (in minutes):</label>
                        <input type="text" 
                            required
                            className="form-control" 
                            value={this.state.duration} 
                            onChange={this.onChangeDuration}/>
                    </div>
                    <div className="form-group">
                        <label>Date:</label>
                        <DatePicker
                            selected={this.state.date}
                            onChange={this.onChangeDate}/>
                    </div>
                    
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        )
    }
}
