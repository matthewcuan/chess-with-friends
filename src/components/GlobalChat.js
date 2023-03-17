import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client'
import Cookies from 'universal-cookie';
import { Form, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

export default function GlobalChat() {

    const cookies = new Cookies();
    const user = cookies.get("USER");
    const [message, setMessage] = useState("");
    const [socket, setSocket] = useState("");
    const messagesRef = useRef(null);
    const navigate = useNavigate();

    // checks if user is logge din
    useEffect( () => {
        const checkLoggedIn = async () => {
            if (!user) {
                navigate('/');
            }
        }
        checkLoggedIn(user);
    }); 

    useEffect(() => {
        const socket = io("https://chesswithfriends-socketio.herokuapp.com:40571");
        setSocket(socket);

        socket.on('connect', () => {
            console.log('connected to socket');
        });

        socket.on('chat message', (msg) => {
            const item = document.createElement('li');
            item.textContent = msg;
            console.log("adding message")
            messagesRef.current.appendChild(item);
            window.scrollTo(0, document.body.scrollHeight);
        });

        return () => {
            socket.disconnect();
        };
    }, []);


    function handleSubmit(event) {
        event.preventDefault();
        if (message.trim()) {
            var chat = user + ": " + message;
            console.log("emitting message")
            socket.emit('chat message', chat);
            setMessage("");
        }
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
                <button id="exit-button" onClick={() => navigate('/home')}>
                    Return Home
                </button>
            </Form>

        </div>   
    )
}

