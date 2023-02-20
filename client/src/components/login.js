import React from "react";
import { Link } from "react-router-dom";


export default function Login() {
    return (
        <div class="login">
            <h1>
                This will be the login page.
            </h1>
            <button>
                <Link to="/game">Play Game</Link>
            </button>
            <button>
                <Link to="/signup">Create Account</Link>
            </button>
            <button>
                <Link to="/history">View Games</Link>
            </button>
        </div>
    )
       
}