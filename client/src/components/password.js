import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";

export default function Password() {

    const [validated, setValidated] = useState(false);
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    
    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          alert("Password Required!")
          event.preventDefault();
          event.stopPropagation();
          return ;
        }
        console.log(`username: ${password}`)
        navigate('/game');
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
