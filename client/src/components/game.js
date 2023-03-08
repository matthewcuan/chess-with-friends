import { React, useState, useEffect, useRef, useMemo } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import io from "socket.io-client";
import { Form, Button } from "react-bootstrap";
// import Chat from "./chat.js"

export default function Game() {
  
  const [game, setGame] = useState(new Chess());
  const [history, setHistory] = useState([game.fen()]);
  const [socket, setSocket] = useState("");
  const [id, setId] = useState("");
  const [board, setBoard] = useState(game.fen());
  const [orientation, setOrientation] = useState("black");
  // const [mounted, setMounted] = useState(false);
  
  const [message, setMessage] = useState("");
  const messagesRef = useRef(null);

  const navigate = useNavigate();
  const cookies = new Cookies();
  const user = useMemo(() => new Cookies().get("USER"), []);

  const newId = useMemo(() => new Cookies().get("NEW_GAME_ID"), []);
  const gameId = useMemo(() => new Cookies().get("GAME_ID"), []);

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
    const socket = io("http://localhost:5000", {
      user: user
    });
    setSocket(socket);

    socket.on('connect', () => {
      console.log('connected to socket');
    });

    if (!gameId) {
      socket.emit('createNewGame', {id:newId, user:user});
      console.log(`created new game: ${newId}`)
      setId(newId)
    } else {
      socket.emit('createNewGame', {id:gameId, user:user});
      console.log(`joined game: ${gameId}`)
      setId(gameId)
    }

    socket.on('message', (msg) => {
      const item = document.createElement('li');
      item.textContent = msg;
      console.log("adding message")
      messagesRef.current.appendChild(item);
      window.scrollTo(0, document.body.scrollHeight);
    }); 

    socket.on('new move', (fen) => {
      console.log('setting new board: ' + fen)
      setBoard(fen);
      game.load(fen);
      // console.log("updating game")
      // setGame(game);
    })

    socket.on('board position', (orientation) => {
      console.log(orientation);
      setOrientation(orientation);
    })

    socket.on('room full', (msg) => {
      alert(msg);
      console.log('room full')
      navigate('/home');
    })

    socket.on('end game', () => {
      game.reset();
    })

    return () => {
      socket.disconnect();
    };
  }, [newId, gameId, game, user, navigate])
  
  function handlePieceDrop(source, target) {
    let move = game.move({
      from: source,
      to: target,
      promotion: 'q'
    })

    if (game.isGameOver()) {
      // const winner = (game.turn() === 'w' ? 'White' : 'Black');
      socket.emit('message', user + " wins!");
      game.reset();
    }

    // legal move
    if (move) {
      setGame(game);
      console.log(game.ascii());
      setHistory([...history, game.fen()]);
      setBoard(game.fen())
      console.log(history)
      console.log(board)
      console.log(game.pgn())
      socket.emit('new move', game.fen());
      return true;
    }

    // illegal move
    alert("Illegal move! Try again.");
    return false;
  };

  function handleSubmit(event) {
    event.preventDefault();
    if (message.trim()) {
        var msg = {chat: user + ": " + message, gameId: id};
        console.log("emitting message")
        console.log(msg);
        socket.emit('message', msg);
        setMessage("");
    }
  }

  function handleExit() {
    console.log("leaving game");
    cookies.remove("GAME_ID");
    console.log(user + " left")
    navigate('/home');
  };

  return (
    <div className="main">
      <div className="board">
        <Chessboard 
          position={board}
          onPieceDrop={handlePieceDrop}
          boardOrientation={orientation}
        />
        <button onClick={() => handleExit()}>
          Exit Game
        </button>
      </div>
      <div className="game-chat">
        <ul id="chat-messages" ref={messagesRef}></ul>
            <Form id="chat-form" noValidate onSubmit={handleSubmit}>
                <Form.Group id="chat-input">
                    <Form.Control
                        id="chat-input"
                        name="message"
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Enter message here..."
                        autoComplete="false"
                        required
                    />
                </Form.Group>
                <Button id="chat-button" variant="primary" type="submit">
                    Send
                </Button>
            </Form>
        </div> 
      
    </div>
  ) 
};