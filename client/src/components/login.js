import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

export default function Login() {

    const [validated, setValidated] = useState(false);
    const [username, setUsername] = useState("");
    const [data, setData] = useState("")

    const navigate = useNavigate();
    
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          alert("Username required!")
          event.preventDefault();
          event.stopPropagation();
          return ;
        }

        const configuration = {
            method: "get",
            url: `http://localhost:8000/api/v1/users/login/${username}`,
        };

        axios(configuration)
        .then((response) => {
            console.log(response.data)
            setData(response.data)
            setValidated(true);
        })
        .catch((error) => {
            console.log("error fetching user from db")
            event.preventDefault();
            event.stopPropagation();
        })

        if (data) {
            navigate("/password");
            setValidated(true);
        } else {
            alert("User not found.")
            event.preventDefault();
            event.stopPropagation();
            return ;
        }

      };

    return (
        <div className="onboard">
            <h1>Multiplayer Chess</h1>
            <Form className="form" noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="input" controlId="validationCustomUsername">
                    <Form.Label>Login: </Form.Label>
                    <Form.Control
                        name="username"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username here"
                        autoComplete="false"
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Next
                </Button>
            </Form>
            <button onClick={() => navigate('/signup')}>
                Create Account
            </button>
            <button onClick={() => navigate('/history')}>
                Games
            </button>
        </div>
    )
       
}