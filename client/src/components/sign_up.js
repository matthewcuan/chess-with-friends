import React from "react";
import { Link } from "react-router-dom";


export default function SignUp() {
    return (
        <div class="login">
            <h1>
                This will be the sign up page.
            </h1>
            <button>
                <Link to="/">Return to login</Link>
            </button>
        </div>
    )   
}