import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Cookies from "universal-cookie";
import { BASE_API_URL } from "../utils/constants";

// options to: 
    // 1. Start a game
    // 2. Join a game
    // 3. Log out
// private game displayed below options
export default function HomePage() {

    const navigate = useNavigate();

    const [validated, setValidated] = useState(false);
    const [newGame, setNewGAme] = useState("");
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
        cookies.set("GAME_ID", gameId, {
            path: BASE_API_URL
        })
        navigate(`/game/`);
        setValidated(true);
    }

    function handleStart() {
        cookies.set("NEW_GAME_ID", newGame, {
            path: BASE_API_URL
        })  
        navigate('/game');
    }
    

    return (
        <div id="home">
            <h1>Welcome, {user}!</h1>
            <Form className="game" noValidate validated={validated} onSubmit={handleStart}>
                <Form.Group className="game-input" controlId="validationCustomUsername">
                    <Form.Control
                        name="new-game"
                        type="text"
                        value={newGame}
                        onChange={(e) => setNewGAme(e.target.value)}
                        placeholder="Enter game id here"
                        autoComplete="false"
                        required
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Create Game
                </Button>
            </Form>
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
                cookies.remove("GAME_ID");
                cookies.remove("NEW_GAME_ID")
            }}>
                Log Out
            </button>
            <button onClick={() => navigate('/changepwd')}>
                Change Password
            </button>
            <button onClick={() => navigate('/gchat')}>
                Chat with Others
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