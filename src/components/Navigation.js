import React from 'react';
import { Link } from 'react-router-dom';

function Navigate() {
    return (
        <nav>
            <Link className="App-link" to="/">Home</Link>
            <Link className="App-link" to="/create-exercise">Create new</Link>
        </nav>
    )
}

export default Navigate