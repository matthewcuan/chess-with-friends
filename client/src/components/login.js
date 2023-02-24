import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { BASE_API_URL } from "../utils/constants"
import Cookies from "universal-cookie"
import axios from "axios";

export default function Login() {

    const [validated, setValidated] = useState(false);
    const [username, setUsername] = useState("");
    const [data, setData] = useState("");

    const navigate = useNavigate();
    const cookies = new Cookies();
    
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
            url: BASE_API_URL + `login/${username}`
        };

        axios(configuration)
        .then((response) => {
            console.log(response.data)
            cookies.set("PASSWORD", response.data.password, {
                path: BASE_API_URL + "/password"
              });
            console.log(`Password: ${response.data.password}`);
            console.log(`Password: ${cookies.get("PASSWORD")}`);
            setData(response.data);
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