import React from "react";
import { Link } from "react-router-dom";


export default function History() {
    return (
        <div class="login">
            <h1>
                This page will contain publicly saved games.
            </h1>
            <button>
                <Link to="/">Return to login</Link>
            </button>
        </div>
    )   
}