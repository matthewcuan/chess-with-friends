import { React, useState } from "react";
import { Chessboard } from "react-chessboard"
import { Chess } from "chess.js";

export default function Game() {
  
  const [game, setGame] = useState(new Chess());
  const [history, setHistory] = useState([game.fen()]);
  
  function handlePieceDrop(source, target) {
    let move = game.move({
      from: source,
      to: target,
      promotion: 'q'
    })

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
    </div>
  ) 

}