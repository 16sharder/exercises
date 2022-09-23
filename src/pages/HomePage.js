import React from 'react';
import {useState, useEffect} from "react"
import { Link, useHistory } from 'react-router-dom';
import {MdAddCircleOutline} from "react-icons/md"
import ExerciseTable from "../components/ExerciseTable"


function HomePage({setEditExercise}) {
    
    const [exercises, setExercises] = useState([])

    const onDelete = async _id => {
        const response = await fetch(`/exercises/${_id}`, {method: "DELETE"})
        if (response.status === 204){
            const newExercises = exercises.filter(exer => exer._id !== _id)
            setExercises(newExercises)
        } else {
            console.error(`Failed to delete movie with ID ${_id}, status code = ${response.status}`)
        }
    }

    const history = useHistory()

    const onEdit = async exercise => {
        setEditExercise(exercise)
        history.push("/edit-exercise")
    }

    const loadExercises = async () => {
        const response = await fetch("/exercises")
        const data = await response.json()
        setExercises(data)
    }

    useEffect(() => {
        loadExercises()
    }, [])

    return(
        <>
            <h2>Table of Exercises</h2>
            <ExerciseTable exercises={exercises} onDelete={onDelete} onEdit={onEdit}/>
            <Link className='App-link' to="/create-exercise"><MdAddCircleOutline /> New exercise</Link>
        </>
    );
}

export default HomePage;