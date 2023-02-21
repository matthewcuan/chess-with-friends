import { React, useState } from "react";
import { Link } from "react-router-dom";

export default function Password() {
    const [password, setPassword] = useState("");

    function handlePasswordChange(event) {
        setPassword(event.target.value);
    }

    function handleLogin(event) {
        event.preventDefault();
        // code to handle login functionality
      }

    return (
        <div className="onboard">
            <h1>Enter Password</h1>
            <form onSubmit={handleLogin}>
                <div className="input">
                    <label htmlFor="password">Password:</label>
                    <input type="text" id="password" value={password} onChange={handlePasswordChange} />
                </div>
                <button type="submit">
                    <Link to="/game">Play Game</Link>
                </button>
            </form>
        </div>    
    )

}
