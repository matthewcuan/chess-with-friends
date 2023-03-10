import { React, useState, useEffect, useRef, useMemo } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import io from "socket.io-client";
import { Form, Button } from "react-bootstrap";
import axios from "axios";
import { GAMES_API_URL } from "../utils/constants";

export default function Game() {
  
  const [game, setGame] = useState(new Chess());
  const [history, setHistory] = useState([]);
  const [socket, setSocket] = useState(null);
  const [id, setId] = useState("");
  const [board, setBoard] = useState(game.fen());
  const [orientation, setOrientation] = useState("black");
  
  const [message, setMessage] = useState("");
  const messagesRef = useRef(null);

  const navigate = useNavigate();
  const cookies = new Cookies();
  const user = useMemo(() => new Cookies().get("USER"), []);

  const gameId = useMemo(() => new Cookies().get("GAME_ID"), []);

  // checks if user is logged in
  useEffect(() => {

    console.log("useEffect called")
    const checkLoggedIn = async () => {
        if (!user) {
            navigate('/');
        }
    }
    checkLoggedIn();
  }, []);

  // connects to socket and listens for events
  useEffect(() => {
    const socket = io("http://localhost:5000", {
      user: user
    });
    setSocket(socket);

    socket.on('connect', () => {
      console.log('connected to socket');
    });

    socket.emit('createNewGame', {id:gameId, user:user});
    console.log(`joined game: ${gameId}`)
    setId(gameId)

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
      console.log(history);
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

    socket.on('history', (history) => {
      console.log("receiving history from server")
      setHistory(history);
      console.log(history);
    })

    socket.on('save options', () => {
      const msg = document.createElement('li');
      msg.textContent = "Would you like to save this game?"
      const save = document.createElement('button');
      save.onclick = () => handleSaveOptions();
      save.textContent = 'Yes';
      msg.appendChild(save);
      const no_save = document.createElement('button');
      no_save.textContent = 'No';
      no_save.onclick = () => handleExit();
      msg.appendChild(no_save);
      messagesRef.current.appendChild(msg);
      window.scrollTo(0, document.body.scrollHeight);
    })

    return () => {
      socket.disconnect();
    };
  }, [])

  // updates board history each time board changes
  useEffect(() => {
    console.log('setting new board: ' + board)
    setHistory(prevHistory => [...prevHistory, game.fen()]);
    console.log(history);
  }, [board])

  // EVENT HANDLERS
  function handlePieceDrop(source, target) {
    let move = game.move({
      from: source,
      to: target,
      promotion: 'q'
    })

    if (game.isGameOver()) {
      socket.emit('game end', {winner: "You win!", loser: user + " wins!"} );
    }

    // legal move
    if (move) {
      setGame(game);
      console.log(game.ascii());
      console.log(board)
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

  function handleReturn() {
    console.log("leaving game");
    cookies.remove("GAME_ID");
    console.log(user + " left")
    navigate('/home');
  };

  function handleExit() {
    const msg = document.createElement('li');
    msg.innerText = "Choose an option: "
    const new_game = document.createElement('button');
    new_game.textContent = 'New Game';
    new_game.onclick = (event, socket) => handleRestart(event, socket);
    msg.appendChild(new_game);
    const exit_game = document.createElement('button');
    exit_game.textContent = 'Exit Game';
    exit_game.onclick = () => handleReturn();
    msg.appendChild(exit_game);
    messagesRef.current.appendChild(msg);
    window.scrollTo(0, document.body.scrollHeight);
  }

  // TODO: fix this
  function handleRestart(event, socket) {
    event.preventDefault();
    if (socket) {
      console.log("restarting")
      socket.emit('message', "new game started");
    } else {
      game.reset()
      socket.emit('message', "new game started");
    }  
  }

  function handleSaveOptions() {
    console.log("showing options")
    console.log(history)
    const msg = document.createElement('li');
    msg.innerText = "Choose a save option: "
    const public_save = document.createElement('button');
    public_save.textContent = 'Public Save';
    public_save.onclick = () => handleSave("public")
    msg.appendChild(public_save);
    const private_save = document.createElement('button');
    private_save.textContent = 'Private Save';
    private_save.onclick = () => handleSave("private")
    msg.appendChild(private_save);
    messagesRef.current.appendChild(msg);
    window.scrollTo(0, document.body.scrollHeight);
  }

  function handleSave(type) {
    console.log("before save:" + history)
    const configuration = {
      method: "post",
      url: GAMES_API_URL + "save",
      data: {
        "title": user,
        "type":  type,
        "players": [user],
        "history": history
      }
    };

    axios(configuration)
    .then((response) => {
      console.log(response.data);
      console.log("game saved");
      const item = document.createElement('li');
      item.textContent = "Game successfully saved.";
      messagesRef.current.appendChild(item);
      window.scrollTo(0, document.body.scrollHeight);
    })
    // if user does not exist
    .catch((error) => {
        alert("Game could not be saved.")
        console.log("error posting game to db")
        return ;
    }) 
  }

  return (
    <div className="main">
      <div className="board">
        <Chessboard 
          position={board}
          onPieceDrop={handlePieceDrop}
          boardOrientation={orientation}
        />
        <button onClick={() => handleReturn()}>
          Exit Game
        </button>
      </div>
      <div className="game-chat">
        <ul id="chat-messages" ref={messagesRef}></ul>
        <Form id="chat-form" noValidate onSubmit={handleSubmit} autoComplete="off">
            <Form.Group id="chat-input">
                <Form.Control
                    id="chat-input"
                    name="message"
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Enter message here..."
                     required
                />
            </Form.Group>
            <Button id="exit-button" variant="primary" type="submit">
                Send
            </Button>
        </Form>
      </div> 
      
    </div>
  ) 
};