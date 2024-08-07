import React, { useState, useEffect, useRef, useMemo } from "react";
import { Chessboard } from "react-chessboard";
import { Form, Button } from "react-bootstrap";
import { Chess } from "chess.js";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import io from "socket.io-client";
import axios from "axios";
import { GAMES_API_URL, SOCKET_URL } from "../utils/constants";
import Arrow from "../assets/icons/arrow.png";
import { motion } from "framer-motion";

export default function Game() {
  
  // init constants
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
  useEffect( () => {
    const checkLoggedIn = async () => {
        if (!user) {
            navigate('/');
        }
    }
    checkLoggedIn(user);
  }); 

  // connects to socket and listens for events
  useEffect(() => {
    let saveHistory
    let players
    let winner

    const socket = io(SOCKET_URL, {
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
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }); 

    socket.on('new move', (fen) => {
      console.log('setting new board: ' + fen)
      setBoard(fen);
      game.load(fen);
      // console.log(history);
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

    socket.on('save options', (data) => {
      saveHistory = data.history
      players = data.users
      winner = data.winner;
      setHistory(history);
      const msg = document.createElement('li');
      msg.textContent = "What would you like to do?"
      const save = document.createElement('button');
      save.id = "chat-button";
      save.className = "save-button"
      save.onclick = () => handleSaveOptions(saveHistory, players, winner);
      save.textContent = 'Save';
      msg.appendChild(save);
      const no_save = document.createElement('button');
      no_save.id = "chat-button";
      no_save.className = "save-button"
      no_save.textContent = 'Exit';
      no_save.onclick = () => navigate('/home');;
      msg.appendChild(no_save);
      messagesRef.current.appendChild(msg);
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    })

    return () => {
      socket.disconnect();
    };
  }, [])

  // updates board history each time board changes
  useEffect(() => {
    setHistory(prevHistory => [...prevHistory, game.fen()]);
  }, [board])

  // EVENT HANDLERS
  function handlePieceDrop(source, target) {
    let move = game.move({
      from: source,
      to: target,
      promotion: 'q'
    })

    // illegal move
    if (!move) {
      alert("Illegal move! Try again.");
      return false;
    }

    // legal move
    setGame(game);
    console.log(game.ascii());
    console.log(board)
    socket.emit('new move', game.fen());

    // game over
    if (game.isGameOver()) {
      socket.emit('game end', {winner: "You win!", loser: user + " wins!"} );
    }

    return true;

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

  function handleSaveOptions(saveHistory, players, winner) {
    const msg = document.createElement('li');
    msg.innerText = "Choose a save option: "
    const public_save = document.createElement('button');
    public_save.textContent = 'Public Save';
    public_save.onclick = () => handleSave("public", saveHistory, players, winner)
    msg.appendChild(public_save);
    const private_save = document.createElement('button');
    private_save.textContent = 'Private Save';
    private_save.onclick = () => handleSave("private", saveHistory, players, winner)
    msg.appendChild(private_save);
    messagesRef.current.appendChild(msg);
    messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
  }

  // For todays date;
  Date.prototype.today = function () { 
    return ((this.getMonth()+1) +"/"+ this.getDate() +"/"+ (this.getFullYear() % 1000)); 
  }

  // For the time now
  Date.prototype.timeNow = function () {
    return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes();
  }

  function handleSave(type, saveHistory, players, winner) {
    console.log("before save:" + saveHistory)
    console.log(players);
    const index = players.indexOf(user);
    console.log(index)
    const player2 = players.splice(index, 1);
    console.log(player2)
    var datetime = new Date().today() + " @ " + new Date().timeNow();
    console.log(datetime);
    
    const configuration = {
      method: "post",
      url: GAMES_API_URL + "save",
      data: {
        "datetime": datetime,
        "player1": user,
        "player2": players[0],
        "winner": winner,
        "type": type,
        "history": saveHistory
      }
    };

    axios(configuration)
    .then((response) => {
      console.log(response.data);
      console.log("game saved");
      const item = document.createElement('li');
      item.textContent = "Game successfully saved.";
      messagesRef.current.appendChild(item);
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
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
      <motion.aside
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="main"
      >
        <div className="board">
          <Chessboard 
            position={board}
            onPieceDrop={handlePieceDrop}
            boardOrientation={orientation}
          />
        </div>
      </motion.aside>
      <div className="chat-container game-chat" id="chat-box">
        <ul id="chat-messages" ref={messagesRef}></ul>
        <Form id="chat-form" noValidate onSubmit={handleSubmit} autoComplete="off">
            <Form.Group id="chat-input">
                <Form.Control
                    id="chat-input"
                    name="message"
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                />
            </Form.Group>
            <Button id="chat-button" variant="primary" type="submit">
                Send
            </Button>
        </Form>
      </div> 
      <div className="buttons account-actions">
        <button className="account-button text-left" onClick={() => handleReturn()}>
          <img className="icon" src={Arrow}></img>
          Exit Game
        </button>
      </div>
      
    </div>
  ) 
};