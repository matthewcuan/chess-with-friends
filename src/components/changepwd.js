import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import Cookies from "universal-cookie";

export default function ChangePwd() {

    const navigate = useNavigate();
    const [validated, setValidated] = useState(false);
    const [old, setOld] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const user = useMemo(() => new Cookies().get("USER"), []);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        // check if the user input a username and password
        if (form.checkValidity() === false) {
          alert("Both fields required!")
          event.preventDefault();
          event.stopPropagation();
          return ;
        }

        if (old === newPassword) {
            alert("Please enter a different new password.")
            return ;
        }

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
                console.log(response.data);
                console.log("success");
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

        event.preventDefault();
        event.stopPropagation();
    };

    return (
        <div className="signup">
            <h1>Change Password</h1>
            <Form className="form" noValidate validated={validated} onSubmit={handleSubmit} autoComplete="off">
                <Form.Group className="input" controlId="validationCustomOld">
                    <Form.Label>Old Password: </Form.Label>
                    <Form.Control
                        name="old"
                        type="text"
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
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Update
                </Button>
            </Form>
            <button onClick={() => navigate('/home')}>
                Return to home page
            </button>
        </div>
        
    )
}