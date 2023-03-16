import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Cookies from "universal-cookie";
import { BASE_API_URL } from "../utils/constants";

// options to: 
    // 1. Start a game
    // 2. Join a game
    // 3. Log out
export default function HomePage() {

    const navigate = useNavigate();

    const [validated, setValidated] = useState(false);
    const [gameId, setGameId] = useState("");

    const cookies = new Cookies();
    const user = cookies.get("USER");

    // checks if user is logge din
    useEffect( () => {
        const checkLoggedIn = async () => {
            if (!user) {
                navigate('/');
            }
        }
        checkLoggedIn(user);
    }); 

    function handleJoin(event) {
        const form = event.currentTarget;

        // checks if there is a game ID input
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

    return (
        <div id="home">
            <h1>Welcome, {user}!</h1>
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
            <div className="buttons">
                <button onClick={() => navigate('/gchat')}>
                    Chat with Others
                </button>
                <button onClick={() => navigate('/saved')}>
                    Saved Games
                </button>
            </div>     
            <div className="buttons">
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
            </div>       
        </div>
    )
}