import React, { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";
import { motion } from "framer-motion";
import Arrow from "../assets/icons/arrow.png";

export default function ChangePwd() {

    const [validated, setValidated] = useState(false);
    const [old, setOld] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const navigate = useNavigate();
    const user = useMemo(() => new Cookies().get("USER"), []);

    // checks if user is logge din
    useEffect( () => {
        const checkLoggedIn = async () => {
            if (!user) {
                navigate('/');
            }
        }
        checkLoggedIn(user);
    }); 

    const handleSubmit = (event) => {

        const form = event.currentTarget;

        // check if the user input a username and password
        if (form.checkValidity() === false) {
          alert("Both fields required!")
          event.preventDefault();
          event.stopPropagation();
          return ;
        }

        // check if new pasword is new
        if (old === newPassword) {
            alert("Please enter a different new password.")
            return ;
        }

        // PUT operation to db
        const configuration = {
            method: "put",
            url: `http://localhost:8000/api/v1/users/changepwd/${user}`,
            data: {
                "old_password": old,
                "new_password": newPassword
            }
        };

        axios(configuration)
        .then((response) => {
            if (response.data.status === "success") {
                alert("Password updated!")
                setValidated(true);
                setOld("");
                setNewPassword("");
            } else {
                alert("Make sure to input the correct password.");
            }
        })
        .catch((error) => {
            alert("Make sure to input the correct password.");
            console.log("error adding user to db");
        })

        // prevents page from reloading
        event.preventDefault();
        event.stopPropagation();

    };

    return (
        <div id="home">
            <div className="welcome-card">
                <p className="welcome-title">Chess with Friends</p>
                <p className="welcome">Welcome, {user}!</p>
            </div>
            <motion.aside
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: .5 }}
                className="home-card"
            >
                <Form className="form" noValidate validated={validated} onSubmit={handleSubmit} autoComplete="off">
                    <Form.Group className="input" controlId="validationCustomOld">
                        <Form.Label className="form-label">Old Password: </Form.Label>
                        <Form.Control
                            name="old"
                            type="text"
                            className="form-control-custom game-input"
                            value={old}
                            onChange={(e) => setOld(e.target.value)}
                            placeholder="Enter old password"
                            required
                        />
                    </Form.Group>
                    <Form.Group className="input" controlId="validationCustomNewPassword">
                        <Form.Label>New Password: </Form.Label>
                        <Form.Control
                            name="newPassword"
                            type="text"
                            className="form-control-custom game-input"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="Enter new password"
                            required
                        />
                    </Form.Group>
                    <Button className="join-button update-button" variant="primary" type="submit">
                        Change Password
                    </Button>
                </Form>
            </motion.aside>
            
            <div className="buttons account-actions">
                <button className="account-button text-left" onClick={() => navigate("/home")}>
                    <img className="icon" src={Arrow}></img>
                    Return Home
                </button>
            </div>
        </div>
        
    )
}