import { React } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie"
import Image from '../assets/images/chess-login.png';
import { motion } from "framer-motion";


export default function Login() {

    const navigate = useNavigate();
    const cookies = new Cookies();

    return (
        
        <div className="onboard">
            <div className="onboard-card">
                
                <div className="title-card">
                    <p className="title">
                        CHESS 
                        <p className="with">
                            with
                        </p> 
                        FRIENDS
                    </p>
                </div>
                <motion.aside
                    initial={{ opacity: .5 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: .5 }}
                >
                    <div className="login-card">
                    <button className="primary-button transparent" onClick={() => navigate('/password')}>
                        Login
                    </button>
                    <button className="primary-button" onClick={() => navigate('/signup')}>
                        Sign Up
                    </button>
                    <button className="add-button" onClick={() => navigate('/saved')}>
                        Past Games
                    </button>
                    </div>
                </motion.aside>
                
            </div>
            <div className="login-image">
                <img src={Image}></img>
            </div>
            
        </div>
    )
       
}