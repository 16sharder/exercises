import React from 'react';
import {useState} from "react"
import {useHistory} from "react-router-dom"

function EditExercise({exerciseEdit}) {
    const [name, setName] = useState(exerciseEdit.name)
    const [reps, setReps] = useState(exerciseEdit.reps)
    const [weight, setWeight] = useState(exerciseEdit.weight)
    const [unit, setUnit] = useState(exerciseEdit.unit)
    const [date, setDate] = useState(exerciseEdit.date)

    const history = useHistory()

    const editExercise = async () => {
        const editedExercise = {name, reps, weight, unit, date}
        const response = await fetch(`/exercises/${exerciseEdit._id}`, {
            method: "PUT", 
            body: JSON.stringify(editedExercise),
            headers: {"Content-type": "application/json"}
        })
        if (response.status === 200){
            alert("Successfully edited exercise")
        } else{
            alert(`Edit exercise failed. Status code = ${response.status}`)
        }

        history.push("/")

    }

    return (
        <div>
            <h3>Edit an exercise</h3>
            <input 
                type="text"
                value={name}
                onChange={newN => setName(newN.target.value)} />
            <input 
                type="number"
                value={reps}
                onChange={newN => setReps(newN.target.value)} />
            <input 
                type="number"
                value={weight}
                onChange={newN => setWeight(newN.target.value)} />
            <select
                value={unit}
                onChange={newN => setUnit(newN.target.value)} >
                    <option value="lbs">lbs</option>
                    <option value="kgs">kgs</option>
            </select>
            <input 
                type="text"
                value={date}
                onChange={newN => setDate(newN.target.value)} />
            <button onClick={editExercise}>Save</button>
        </div>
    )
}

export default EditExercise