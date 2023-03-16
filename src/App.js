import "./App.css";
import Game from "./components/game";
import { React } from "react";
import { BrowserRouter as Router, Routes, Route } 
  from "react-router-dom";
import Login from "./onboard/login";
import SignUp from "./onboard/sign_up";
import History from "./components/history";
import Password from "./onboard/password";
import HomePage from "./components/home";
import ChangePwd from "./components/changepwd";
import GlobalChat from "./components/global_chat";
import ReviewHistory from "./components/ReviewHistory";
import SavedGames from "./components/SavedGames";

export default function App() {

  return (
    <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/password" element={<Password />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/game" element={<Game />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/history" element={<History />} />
          <Route path="/changepwd" element={<ChangePwd />} />
          <Route path="/gchat" element={<GlobalChat />} />
          <Route path="/review" element={<ReviewHistory />} />
          <Route path="/saved" element={<SavedGames />} />
        </Routes>
    </Router>
    
  )
} 