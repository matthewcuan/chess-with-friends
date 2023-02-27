import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Cookies from "universal-cookie";

export default function Password() {

    const [validated, setValidated] = useState(false);
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const cookies = new Cookies();
    const user_password = cookies.get("PASSWORD");
    console.log(user_password);

    
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            alert("Password required!")
            event.preventDefault();
            event.stopPropagation();
            return ;
        } else if (password !== user_password) {
            alert("Incorrect password!")
            event.preventDefault();
            event.stopPropagation();
            return ;
        }
        console.log(`password: ${password}`)
        navigate('/home');
        setValidated(true);
      };

    return (
        <div className="onboard">
            <h1>Enter Password</h1>
            <Form className="form" noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Group className="input" controlId="validationCustomUsername">
                    <Form.Label>Password: </Form.Label>
                    <Form.Control
                        name="password"
                        type="text"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter password here"
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </div>    
    )

}
