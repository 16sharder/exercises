import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as exercises from './a7_model.mjs';

const app = express()

const PORT = process.env.PORT;

app.use(express.json());


function isDateValid(date) {
    // Test using a regular expression. 
    // To learn about regular expressions see Chapter 6 of the text book
    const format = /^\d\d-\d\d-\d\d$/;
    return format.test(date);
}

function checkValidity(name, reps, weight, unit, date) {
    // checks the validity of a body object
    reps = parseInt(reps)
    weight = parseInt(weight)

    if (typeof(name) !== "string" || isNaN(reps) || isNaN(weight) || typeof(unit) !== "string" || typeof(date) !== "string" ||
        name === "" ||
        reps <= 0 ||
        weight <= 0 ||
        unit !== "kgs" && unit !== "lbs" ||
        ! isDateValid(date))
        {
            return false
    }
    else return true
}


app.post("/exercises", asyncHandler(async(req, res, next) => {
    // uses createExercise function from model to make a new exercise with given criteria
    // returns the exercise object
    
    // if body is not valid, sends an error
    if (checkValidity(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date) === false){
        res.type("application/json").status(400).send({Error: "Invalid request"})
    }

    // if body is valid, creates a new exercise
    else{
        const exercise = await exercises.createExercise(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date)
        res.type("application/json").status(201).send(exercise)
}}))



app.get("/exercises", asyncHandler(async(req, res, next) => {
    // uses getExercises function from model to return all exercises
    const exercise = await exercises.getExercises()
    res.type("application/json").status(200).send(exercise)
}))

app.get("/exercises/:id", asyncHandler(async(req, res, next) => {
    // uses findExercise function from model to return the exercise of the given id
    const request = req.params.id
    const exercise = await exercises.findExercise(request)
    if (exercise === null){
        res.type("application/json").status(404).send({Error: "Not found"})
    }
    else res.type("application/json").status(200).send(exercise)
}))


app.put("/exercises/:id", asyncHandler(async(req, res, next) => {
    // uses updateExercise function from model to update an exercise given their id and the values to update
    // returns a count of modified exercises
    const request = {_id: req.params.id}

    if (checkValidity(req.body.name, req.body.reps, req.body.weight, req.body.unit, req.body.date) === false) {
        res.type("application/json").status(400).send({Error: "Invalid request"})
    }
    else {
        const exercise = await exercises.updateExercise(request, req.body)
        if (exercise === null) {
            res.type("application/json").status(404).send({Error: "Not found"})
        }
        else res.type("application/json").status(200).send(exercise)
}}))

app.delete("/exercises/:id", asyncHandler(async(req, res, next) => {
    // uses deleteExercise function from model to delete the exercise of the given id
    // returns a count of deleted exercises
    const request = {_id: req.params.id}
    const count = await exercises.deleteExercise(request)
    if (count === 0){
        res.type("application/json").status(404).send({Error: "Not found"})
    }
    else res.status(204).send()
}))



app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});
