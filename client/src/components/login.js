import { React, useState } from "react";
import { Link } from "react-router-dom";
import { Form, Button, InputGroup } from "react-bootstrap";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function Login() {

    const { register, errors } = useForm();

    const [validated, setValidated] = useState(false);
    
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
    
        setValidated(true);
      };
    

    return (
        <div className="onboard">
            <h1>Multiplayer Chess</h1>
            <Form className="input" noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group controlId="username">
                    <Form.Label>Username: </Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                            type="text"
                            placeholder="Username"
                            aria-describedby="inputGroupPrepend"
                            required
                            />
                            <Form.Control.Feedback type="invalid">
                            Please choose a username.
                            </Form.Control.Feedback>
                        </InputGroup>
                    {/* <Form.Control 
                        required
                        type="text"
                        name="username"
                        placeholder="Enter username here"
                    />
                    <Form.Control.Feedback type="invalid">
                        Please enter a username.
                    </Form.Control.Feedback> */}
                </Form.Group>
                <Button variant="primary" type="submit">
                    <Link to="/password">Next</Link>
                </Button>
            </Form>
            {/* <form onSubmit={handleUsername}>
                <div className="input">
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" value={username} onChange={handleUsernameChange} />
                </div>
                <button type="submit">
                    <Link to="/password">Next</Link>
                </button>
            </form> */}
            <button>
                <Link to="/signup">Create Account</Link>
            </button>
            <button>
                <Link to="/history">View Games</Link>
            </button>
        </div>
    )
       
}