import mongoose from 'mongoose';
import 'dotenv/config';

mongoose.connect(
    process.env.MONGODB_CONNECT_STRING,
    { useNewUrlParser: true }
);

const db = mongoose.connection;




const exerciseSchema = mongoose.Schema({
    // creates a Schema that is used as a basis for all exercise objects created
    name: { type: String, required: true },
    reps: { type: Number, required: true },
    weight: { type: Number, required: true },
    unit: {type: String, required: true},
    date: { type: String, required: true }
})

// creates an Exercise model class based on the precreated Schema
const Exercise = mongoose.model("Exercise", exerciseSchema)

const createExercise = async(name, reps, weight, unit, date) => {
    // uses the Exercise class to create a new exercise object with all required parameters
    const exercise = new Exercise({name: name, reps: reps, weight: weight, unit: unit, date: date})
    return exercise.save()
}



const getExercises = async() => {
    // retrieves all the exercises in existence in the database
    const query = Exercise.find({})
    return query.exec()
}

const findExercise = async(filter) => {
    // finds the exercise of a certain id and returns it if in existence
    const query = Exercise.findById(filter)
    return query.exec()
}


const updateExercise = async(filter, update) => {
    // finds the exercise of a certain id, then updates the provided criteria for that exercise
    await Exercise.updateOne(filter, update)
    const exercise = findExercise(filter)
    return exercise
}


const deleteExercise = async(filter) => {
    // finds the exercise of a certain id and deletes it if in existence
    const response = await Exercise.deleteOne(filter)
    return response.deletedCount
}



db.once("open", () => {
    console.log("Successfully connected to MongoDB using Mongoose!");
});

export {createExercise, getExercises, findExercise, updateExercise, deleteExercise}
