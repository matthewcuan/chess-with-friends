import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { BASE_API_URL } from "../utils/constants";
import Cookies from "universal-cookie";
import axios from "axios";
import { motion } from "framer-motion";
import Image from '../assets/images/chess-login.png';

export default function SignUp() {

    const [validated, setValidated] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const navigate = useNavigate();
    const cookies = new Cookies();
  
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        // check if the user input a username and password
        if (form.checkValidity() === false) {
          alert("Both username and password required!")
          event.preventDefault();
          event.stopPropagation();
          return ;
        }

        // // TODO: implement hashing for more secure login js-sha256
        // function hash(string) {
        //     return createHash('sha256').update(string).digest('hex');
        // }

        // setPassword(hash(password));

        const configuration = {
            method: "post",
            url: BASE_API_URL+ 'signup',
            data: {
                username,
                password
            }
        };

        axios(configuration)
        .then((response) => {
            if (response.data.status) {
                console.log(response.data);
                
                cookies.set("USER", username, {
                    path: BASE_API_URL
                });

                console.log("success");
                navigate('/home');
                setValidated(true);
            } else {
                alert("Username taken. Try another.");
            }
        })
        .catch((error) => {
            console.log("error adding user to db");
        })

        event.preventDefault();
        event.stopPropagation();
    };

    return (
        <div className="onboard">
            <div className="onboard-card">
                <div className="title-card">
                    <p className="title">
                        CHESS 
                        <p className="with">
                            with
                        </p> 
                        FRIENDS
                    </p>
                </div>
                <motion.aside
                    initial={{ opacity: .5 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: .5 }}
                >
                    <Form className="form login-card" noValidate validated={validated} onSubmit={handleSubmit} autoComplete="off">
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
                        <Button className="primary-button" variant="primary" type="submit">
                            Sign Up
                        </Button>
                        <button className="add-button" onClick={() => navigate('/')}>
                            Return to login
                        </button>
                    </Form>
                </motion.aside>   
            </div>
            <div className="login-image">
                <img src={Image}></img>
            </div>  
        </div>
    )   
}