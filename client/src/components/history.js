import React from "react";
import { useNavigate } from "react-router-dom";


export default function History() {

    const navigate = useNavigate()

    return (
        <div className="login">
            <h1>
                This page will contain publicly saved games.
            </h1>
            <button onClick={() => navigate('/')}>
                Return to login
            </button>
        </div>
    )   
}