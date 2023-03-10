import React, { useState, useEffect, useRef, useMemo } from 'react';
import Cookies from 'universal-cookie';
import { Form, Button } from "react-bootstrap";
import axios from 'axios';
import { GAMES_API_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { io } from 'socket.io-client';

export default function Chat() {

    const cookies = new Cookies();
    const [message, setMessage] = useState("");
    const messagesRef = useRef(null);
    const user = useMemo(() => new Cookies().get("USER"), []);
    const navigate = useNavigate(); 
    const [socket, setSocket] = useState(null);
    const gameId = useMemo(() => new Cookies().get("GAME_ID"), []);

    useEffect(() => {

        const socket = io("http://localhost:5000", {
            user: user
        });
        
        console.log(socket);
        setSocket(socket)

        socket.on('message', (msg) => {
            const item = document.createElement('li');
            item.textContent = msg;
            console.log("adding message")
            console.log(messagesRef.current)
            messagesRef.current.appendChild(item);
            window.scrollTo(0, document.body.scrollHeight);
        });
        
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

    }, []);

    function handleSubmit(event) {
        event.preventDefault();
        if (message.trim()) {
            var msg = {chat: user + ": " + message, gameId: gameId};
            console.log("emitting message")
            console.log(msg);
            console.log(messagesRef)
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
        //   game.reset()
          socket.emit('message', "new game started");
        }  
      }
    
      function handleSaveOptions() {
        console.log("showing options")
        // console.log(history)
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
        // console.log("before save:" + history)
        const configuration = {
          method: "post",
          url: GAMES_API_URL + "save",
          data: {
            "title": user,
            "type":  type,
            "players": [user],
            // "history": history
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
        <div>
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
    )
}

