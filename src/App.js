import './App.css';
import React from 'react';
import {useState} from "react"
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from "./pages/HomePage"
import EditExercise from "./pages/EditExercise"
import CreateExercise from "./pages/CreateExercise"
import Navigate from './components/Navigation';

function App() {
  const [exerciseEdit, setEditExercise] = useState()

  return (
    <div className="App">
      <header>
        <h1>
          Exercise Log
        </h1>
        <p>
          MERN app that tracks exercises
        </p>
      </header>
      <Router>
        <div className="App-header">
          <Navigate />
          <Route path="/" exact>
            <HomePage setEditExercise={setEditExercise}/>
          </Route>
          <Route path="/edit-exercise">
            <EditExercise exerciseEdit={exerciseEdit}/>
          </Route>
          <Route path="/create-exercise">
            <CreateExercise />
          </Route>
        </div>
      </Router>
      <footer>
        ©2022 Sara Harder
      </footer>
    </div>
  );
}

export default App;
