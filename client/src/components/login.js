import { React, useState } from "react";
import { Link } from "react-router-dom";


export default function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    function handleUsernameChange(event) {
      setUsername(event.target.value);
    }
  
    function handlePasswordChange(event) {
      setPassword(event.target.value);
    }
  
    function handleLogin(event) {
      event.preventDefault();
      // code to handle login functionality
    }

    return (
        <div class="login">
            <h1>Multiplayer Chess</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" value={username} onChange={handleUsernameChange} />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={password} onChange={handlePasswordChange} />
                </div>
                <button type="submit">
                    <Link to="/game">Play Game</Link>
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