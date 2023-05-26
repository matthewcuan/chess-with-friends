import { React } from "react";
import { BrowserRouter as Router, Routes, Route } 
  from "react-router-dom";
import "./App.css";
import Game from "./components/Game";
import Login from "./onboard/Login";
import SignUp from "./onboard/SignUp";
import Password from "./onboard/Password";
import HomePage from "./components/HomePage";
import ChangePwd from "./components/ChangePwd";
import GlobalChat from "./components/GlobalChat";
import ReviewHistory from "./components/ReviewHistory";
import SavedGames from "./components/SavedGames";
import ContactBar from "./components/ContactBar";


export default function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/password" element={<Password />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/game" element={<Game />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/changepwd" element={<ChangePwd />} />
          <Route path="/gchat" element={<GlobalChat />} />
          <Route path="/review" element={<ReviewHistory />} />
          <Route path="/saved" element={<SavedGames />} />
        </Routes>
      </Router>
      <ContactBar />
    </div>
    
    
  )
} 