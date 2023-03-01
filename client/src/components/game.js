import { React, useState } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

export default function Game() {
  
  const [game, setGame] = useState(new Chess());
  const [history, setHistory] = useState([game.fen()]);
  
  const navigate = useNavigate();

  var socket = io("http://localhost:5000");

  socket.on('connected', console.log("connected"));
  
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

  return (
    <div className="main">
      <div className="board">
        <Chessboard 
          position={game.fen()}
          onPieceDrop={handlePieceDrop}
        />
      </div>
      <button onClick={() => navigate('/home')}>
        Exit Game
      </button>
    </div>
  ) 

}