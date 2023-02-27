import React from "react";
import { useNavigate } from "react-router-dom";

export default function ChangePwd() {

    const navigate = useNavigate();

    return (
        <div>
            <h1>User will be able to change password here.</h1>
            <button onClick={() => navigate('/profile')}>
                Return to profile
            </button>
        </div>
        
    )
}