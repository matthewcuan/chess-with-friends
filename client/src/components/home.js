import { React, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

// options to: 
    // 1. Start a game
    // 2. Join a game
    // 3. Log out
    // 4. View public games
// private game displayed below options
export default function HomePage() {

    const navigate = useNavigate();

    const cookies = new Cookies();
    const user = cookies.get("USER");

    useEffect( () => {
        const navigationTo = async () => {
            if (!user) {
                navigate('/');
            }
        }
        navigationTo();
    });
    

    return (
        <div>
            <h1>Welcome, {user}!</h1>
            <button onClick={() => navigate('/game')}>
                Start Game
            </button>
            <button onClick={() => navigate('/game')}>
                Join Game
            </button>
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