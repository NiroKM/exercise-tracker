import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';


const Exercise = props =>(
    <tr>
        <td>{props.exercise.username}</td>
        <td>{props.exercise.description}</td>
        <td>{props.exercise.duration}</td>
        <td>{props.exercise.date.substring(0,10)}</td>
        <td>
            <Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={()=>{props.deleteExercise(props.exercise._id)}}>delete</a>
        </td>
    </tr>
)

export default class ExerciseList extends Component{

    constructor(props){
        super(props)

        this.state={
            exercises:[]
        }
    }

    componentDidMount(){
        axios.get("https://mern-exercise.herokuapp.com/exercise/")
            .then(response=>{
                this.setState({
                    exercises:response.data
                })
            })
            .catch(err=>console.log("Err "+err));
    }

    deleteExercise=(nid)=>{
        axios.delete("https://mern-exercise.herokuapp.com/exercise/"+nid)
            .then(response=>console.log(response.data))
            .catch(err=>console.log(err))
        
        this.setState({
            exercise: this.state.exercises.filter(item => item._id!==nid)
        })

        window.location='/';
    }

    exerciseList=()=>{
        return this.state.exercises.map(currentExercise=>{
            return <Exercise exercise={currentExercise} deleteExercise={this.deleteExercise} key={currentExercise._id}/>
        })
    }

    render(){
        return(
            <div>
                <h3>Logged Exercise</h3>
                <table className="table">
                    <thead className="thead-light">
                        <tr>
                            <th>Username</th>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.exerciseList()}
                    </tbody>
                </table>
            </div>
        )
    }
}