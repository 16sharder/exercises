import React from 'react';
import {useState} from "react"
import {useHistory} from "react-router-dom"

function CreateExercise() {
    const [name, setName] = useState("")
    const [reps, setReps] = useState()
    const [weight, setWeight] = useState()
    const [unit, setUnit] = useState("lbs")
    const [date, setDate] = useState("")

    const history = useHistory()

    const addExercise = async () => {
        const newExercise = {name, reps, weight, unit, date}
        console.log(name, reps, weight, unit, date)
        const response = await fetch("/exercises", {
            method: "POST", 
            body: JSON.stringify(newExercise),
            headers: {"Content-type": "application/json"}
        })
        if (response.status === 201){
            alert("Successfully created a new exercise")
        } else{
            alert(`Create exercise failed. Status code = ${response.status}`)
        }

        history.push("/")

    }

    return (
        <div>
            <h3>Create a new exercise</h3>
            <input 
                type="text"
                placeholder="New exercise name"
                value={name}
                onChange={newN => setName(newN.target.value)} />
            <input 
                type="number"
                placeholder="Exercise reps"
                value={reps}
                onChange={newN => setReps(newN.target.value)} />
            <input 
                type="number"
                placeholder="Exercise weight"
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
                placeholder="Date"
                value={date}
                onChange={newN => setDate(newN.target.value)} />
            <button onClick={addExercise}>Create</button>
        </div>
    )
}

export default CreateExercise