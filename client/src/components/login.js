import { React, useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {

    const [username, setUsername] = useState("");
    
    function handleUsernameChange(event) {
        setUsername(event.target.value);
    }

    function handleUsername(event) {
        // call apiGetUser
    }

    return (
        <div className="onboard">
            <h1>Multiplayer Chess</h1>
            <form onSubmit={handleUsername}>
                <div className="input">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" value={username} onChange={handleUsernameChange} />
                </div>
                <button type="submit">
                    <Link to="/password">Next</Link>
                </button>
            </form>
            <button>
                <Link to="/signup">Create Account</Link>
            </button>
            <button>
                <Link to="/history">View Games</Link>
            </button>
        </div>
    )
       
}