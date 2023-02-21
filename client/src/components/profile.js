import { React, useState } from "react";
import { Link } from "react-router-dom";

// will contain public games, private games, and a play button
export default function ProfilePage() {

    return (
        <div>
            <button>
                <Link to="/history">View Games</Link>
            </button>
            <button>
                <Link to="/game">Play Game</Link>
            </button>
            <ul>
                <li>Private Game</li>
                <li>Private Game</li>
                <li>Private Game</li>
            </ul>
        </div>
    )
}