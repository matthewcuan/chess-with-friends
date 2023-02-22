import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

export default function SignUp() {

    const [validated, setValidated] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const navigate = useNavigate();
  
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          alert("Both username and password required!")
          event.preventDefault();
          event.stopPropagation();
          return ;
        }
        console.log(`username: ${username}`)
        console.log(`password: ${password}`)
        navigate('/game');
        setValidated(true);
      
    };

    return (
        <div className="signup">
            <h1>Create an Account</h1>
            <Form className="form" noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="input" controlId="validationCustomUsername">
                    <Form.Label>Username: </Form.Label>
                    <Form.Control
                        name="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username here"
                        required
                    />
                </Form.Group>
                <Form.Group className="input" controlId="validationCustomUsername">
                    <Form.Label>Password: </Form.Label>
                    <Form.Control
                        type="text"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password here"
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Sign Up
                </Button>
            </Form>
            {/* <form onSubmit={handleLogin}>
                <div class="input">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" value={username} onChange={handleUsernameChange} />
                </div>
                <div class="input">
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={password} onChange={handlePasswordChange} />
                </div>
                <div class="input">
                    <label htmlFor="password">Confirm Password: </label>
                    <input type="password" id="password" value={password} onChange={handlePasswordChange} />
                </div>
                <button type="submit">
                    Play Game
                </button>
            </form> */}
            <button onClick={() => navigate('/')}>
                Return to login
            </button>
        </div>
    )   
}