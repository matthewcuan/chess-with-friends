import { React } from "react";
import { useNavigate } from "react-router-dom";
import LoginImage from '../assets/images/chess-login.png';
import { motion } from "framer-motion";
import TitleCard from "../components/TitleCard";

export default function Login() {

    const navigate = useNavigate();

    return (
        <div className="onboard">
            <div className="onboard-card">
                <TitleCard />
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
                <img src={LoginImage}></img>
            </div>
        </div>
    )
       
}