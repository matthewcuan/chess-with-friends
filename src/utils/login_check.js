import { useNavigate } from "react-router-dom";

const navigate = useNavigate()

const checkLoggedIn = async (user) => {
    if (!user) {
        navigate('/');
    }
}