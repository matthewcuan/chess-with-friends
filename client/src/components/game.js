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
  // const [mounted, setMounted] = useState(false);
  

  const navigate = useNavigate();
  const cookies = new Cookies();
  const user = cookies.get("USER");

  const newId = cookies.get("NEW_GAME_ID");
  const gameId = cookies.get("GAME_ID");

  useEffect(() => {

    console.log("useEffect called")
    const checkLoggedIn = async () => {
        if (!user) {
            navigate('/');
        }
    }
    checkLoggedIn();
  }, [user, navigate]);

  useEffect(() => {
    const socket = io("http://localhost:5000");
    setSocket(socket);

    socket.on('connect', () => {
      console.log('connected to socket');
    });

    // socket.emit('createNewGame', newId);
    // console.log(`created new game: ${newId}`)

    if (!gameId) {
      socket.emit('createNewGame', newId);
      console.log(`created new game: ${newId}`)
    } else {
      socket.emit('createNewGame', gameId);
      console.log(`joined game: ${gameId}`)
    }

    return () => {
      socket.disconnect();
    };
  }, [newId, gameId])
  
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
    cookies.remove("GAME_ID")
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