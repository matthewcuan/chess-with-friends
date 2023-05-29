import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Cookies from "universal-cookie";
import LoginImage from '../assets/images/chess-login.png';
import axios from "axios";
import { BASE_API_URL } from "../utils/constants";
import { motion } from "framer-motion";
import TitleCard from "../components/TitleCard";

export default function Password() {

    const [validated, setValidated] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const cookies = new Cookies();
    
    const handleSubmit = (event) => {
        const form = event.currentTarget;

        if (form.checkValidity() === false) {
            alert("Both fields required!")
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
            // console.log(response.data)
            cookies.set("USER", response.data.user, {
                path: "/"
              });
            if (password !== response.data.password) {
                alert("Incorrect password!")
                event.preventDefault();
                event.stopPropagation();
                return ;
            }
            navigate('/home');
            setValidated(true);
            setValidated(true);
        })
        // if user does not exist
        .catch((error) => {
            alert("User not found. Sign up for an account.")
            console.log("error fetching user from db")
            return ;
        })
        .then(() => {
            
        })

        event.preventDefault();
        event.stopPropagation();
    };

    return (
        <div className="onboard">
             <div className="onboard-card">
                <TitleCard />
                <motion.aside
                    initial={{ opacity: .5 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: .5 }}
                >
                    <Form className="form login-card" noValidate validated={validated} onSubmit={handleSubmit}>
                        <Form.Group className="input" controlId="validationCustomUsername">
                            <Form.Label className="form-label">Username: </Form.Label>
                            <Form.Control
                                name="username"
                                className="form-control-custom"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter username here"
                                autoComplete="false"
                                required
                            />
                        </Form.Group>
                        <Form.Group className="input" controlId="validationCustomUsername">
                            <Form.Label className="form-label">Password: </Form.Label>
                            <Form.Control
                                name="password"
                                className="form-control-custom"
                                type="text"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password here"
                                required
                            />
                        </Form.Group>
                        <Button className="primary-button" variant="primary" type="submit">
                            Login
                        </Button>
                        <button className="add-button" onClick={() => navigate('/')}>
                            Return
                        </button>
                    </Form>
                </motion.aside>
            </div>
            <div className="login-image">
                <img src={LoginImage}></img>
            </div>
        </div>    
    )

}
