import { React, useState } from "react";
import { Link } from "react-router-dom";


export default function SignUp() {

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
        <div class="signup">
            <h1>Create an Account</h1>
            <form onSubmit={handleLogin}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" value={username} onChange={handleUsernameChange} />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={password} onChange={handlePasswordChange} />
                </div>
                <div>
                    <label htmlFor="password">Confirm Password:</label>
                    <input type="password" id="password" value={password} onChange={handlePasswordChange} />
                </div>
                <button type="submit">
                    <Link to="/game">Play Game</Link>
                </button>
            </form>
            <button>
                <Link to="/">Return to login</Link>
            </button>
        </div>
    )   
}