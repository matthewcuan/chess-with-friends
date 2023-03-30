import { React, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import Cookies from "universal-cookie";
import { BASE_API_URL } from "../utils/constants";
import Arrow from "../assets/icons/arrow.png";
import Lock from "../assets/icons/lock.png";
import { motion } from "framer-motion";

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
                <Form className="game" noValidate validated={validated} onSubmit={handleJoin}>
                    <Form.Label className="form-label home-label">Enter Game ID</Form.Label>
                    <Form.Group className="input" controlId="validationCustomUsername">
                        <Form.Control
                            name="game"
                            className="form-control-custom game-input"
                            type="text"
                            value={gameId}
                            onChange={(e) => setGameId(e.target.value)}
                            autoComplete="false"
                            required
                        />
                        <Button className="join-button" variant="primary" type="submit">
                            Join Game
                        </Button>
                    </Form.Group>  
                </Form>
                <div className="buttons additional-home-buttons">
                    <button className="add-home-button" onClick={() => navigate('/gchat')}>
                        Chat with Others
                    </button>
                    <button className="add-home-button" onClick={() => navigate('/saved')}>
                        Saved Games
                    </button>
                </div>     
            </motion.aside>
            <div className="buttons account-actions">
                    <button className="account-button text-left" onClick={() => {
                        navigate('/');
                        cookies.remove("USER");
                        cookies.remove("GAME_ID");
                        cookies.remove("NEW_GAME_ID")
                    }}>
                        <img className="icon" src={Arrow}></img>
                        Log Out
                    </button>
                    <button className="account-button text-left" onClick={() => navigate('/changepwd')}>
                        <img className="icon" src={Lock}></img>
                        Change Password
                    </button>
                </div>   
        </div>
    )
}