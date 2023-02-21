import "./App.css"
import Game from "./components/game"
import { React } from "react";
import { BrowserRouter as Router, Routes, Route } 
  from "react-router-dom"
import Login from "./components/login";
import SignUp from "./components/sign_up";
import History from "./components/history";
import Password from "./components/password";

export default function App() {

  return (
    <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/password" element={<Password />} />
          <Route path="/game" element={<Game />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/history" element={<History />} />
        </Routes>
    </Router>
    
  )
} 