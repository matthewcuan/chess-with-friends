import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { BASE_API_URL, HOST_URL } from "../utils/constants"
import Cookies from "universal-cookie"
import axios from "axios";

export default function Login() {

    const [validated, setValidated] = useState(false);
    const [username, setUsername] = useState("");

    const navigate = useNavigate();
    const cookies = new Cookies();
    
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        // checks if there is a username input
        if (form.checkValidity() === false) {
          alert("Username required!")
          event.preventDefault();
          event.stopPropagation();
          return ;
        }

        const configuration = {
            method: "get",
            url: BASE_API_URL + `login/${username}`
        };

        axios(configuration)
        // if user exists
        .then((response) => {
            console.log(response.data)
            cookies.set("PASSWORD", response.data.password, {
                path: HOST_URL + "/password"
              });
            cookies.set("USER", response.data.user, {
                path: "/"
              });
            navigate("/password");
            setValidated(true);
        })
        // if user does not exist
        .catch((error) => {
            alert("User not found. Sign up for an account.")
            console.log("error fetching user from db")
            return ;
        })

        event.preventDefault();
        event.stopPropagation();
      };

    return (
        <div className="onboard">
            <h1>Chess with Friends</h1>
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
            <button onClick={() => navigate('/saved')}>
                Games
            </button>
        </div>
    )
       
}