import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Cookies from "universal-cookie";

// options to: 
    // 1. Start a game
    // 2. Join a game
    // 3. Log out
// private game displayed below options
export default function HomePage() {

    const navigate = useNavigate();

    const [validated, setValidated] = useState(false);
    const [gameId, setGameId] = useState("");

    const cookies = new Cookies();
    const user = cookies.get("USER");

    useEffect( () => {
        const checkLoggedIn = async () => {
            if (!user) {
                navigate('/');
            }
        }
        checkLoggedIn();
    });

    function handleJoin(event) {
        const form = event.currentTarget;

        // checks if there is a username input
        if (form.checkValidity() === false) {
            alert("Game ID required!")
            event.preventDefault();
            event.stopPropagation();
            return ;
          }

        navigate(`/game/${gameId}`)
        setValidated(true);
    }

    function handleStart() {
        navigate('/game')
    }
    

    return (
        <div id="home">
            <h1>Welcome, {user}!</h1>
            <button onClick={() => handleStart()}>
                Start Game
            </button>
            <Form className="game" noValidate validated={validated} onSubmit={handleJoin}>
                <Form.Group className="game-input" controlId="validationCustomUsername">
                    <Form.Control
                        name="game"
                        type="text"
                        value={gameId}
                        onChange={(e) => setGameId(e.target.value)}
                        placeholder="Enter game id here"
                        autoComplete="false"
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Join Game
                </Button>
            </Form>
            <button onClick={() => {
                navigate('/');
                cookies.remove("USER");
            }}>
                Log Out
            </button>
            <button onClick={() => navigate('/changepwd')}>
                Change Password
            </button>
            <ul>
                <li>Private Game</li>
                <li>Public Game</li>
                <li>Public Game</li>
                <li>Private Game</li>
                <li>Private Game</li>
            </ul>
        </div>
    )
}