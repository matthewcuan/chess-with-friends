import { React, useState, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import io from "socket.io-client";

export default function Game() {
  
  const [game, setGame] = useState(new Chess());
  const [history, setHistory] = useState([game.fen()]);
  const [socket, setSocket] = useState("");
  
  const navigate = useNavigate();

  // checks if socket is connected
  // if not, connect socket
  if (!socket) {
    console.log("connecting to socket")
    setSocket(io("http://localhost:5000"));
  }

  const cookies = new Cookies();
  const user = cookies.get("USER");

  // checks if user is logged in
  // if not, redirect to login page
  useEffect( () => {
    const checkLoggedIn = async () => {
        if (!user) {
            navigate('/');
        }
    }
    checkLoggedIn();
  });
  
  function handlePieceDrop(source, target) {
    let move = game.move({
      from: source,
      to: target,
      promotion: 'q'
    })

    if (game.isGameOver()) {
      const winner = (game.turn() === 'w' ? 'White' : 'Black');
      alert(`${winner} wins!`);
      game.reset();
    }

    // legal move
    if (move) {
      setGame(game);
      console.log(game.ascii());
      setHistory([...history, game.fen()]);
      console.log(history)
      return true;
    }

    // illegal move
    alert("Illegal move! Try again.");
    return false;
  };

  function handleExit() {
    navigate('/home');
        console.log("leaving game")
    if (socket) {
      socket.disconnect();
    }
  };

  return (
    <div className="main">
      <div className="board">
        <Chessboard 
          position={game.fen()}
          onPieceDrop={handlePieceDrop}
        />
      </div>
      <button onClick={() => handleExit()}>
        Exit Game
      </button>
    </div>
  ) 
};