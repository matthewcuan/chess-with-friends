import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client'
import Cookies from 'universal-cookie';
import { Form, Button } from "react-bootstrap";

export default function GlobalChat() {

    const cookies = new Cookies();
    const nickname = cookies.get("USER");
    const [message, setMessage] = useState("");
    // const [connected, setConnected] = useState(false);
    const [socket, setSocket] = useState("");
    const messagesRef = useRef(null);
    
    // if (!connected) {
    //     setSocket(io("http://localhost:5000"));
    //     setConnected(true);
    // }

    // // const socket = io("http://localhost:5000");

    // // const form = document.getElementById('chat-form');
    // const input = document.getElementById('chat-input');
    // const messages = document.getElementById('chat-messages');
    
    // form.addEventListener('submit', function(e) {
    //     e.preventDefault();
    //     if (input.value) {
    //         var message = nickname.value + ": " + input.value;
    //            socket.emit('chat message', message);
    //         input.value = '';
    //     }
    // });

    useEffect(() => {
        const socket = io("http://localhost:5000");
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
            var chat = nickname + ": " + message;
            console.log("emitting message")
            socket.emit('chat message', chat);
            setMessage("");
        }
    }

    // socket.on('chat message', function(msg) {
    //     var item = document.createElement('li');
    //     item.textContent = msg;
    //     console.log("adding message")
    //     messages.appendChild(item);
    //     window.scrollTo(0, document.body.scrollHeight);
    // });

    return (
        <div>
            <ul id="chat-messages" ref={messagesRef}></ul>
            <Form id="chat-form" noValidate onSubmit={handleSubmit}>
                <Form.Group>
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
            {/* <form id="chat-form" action="">
                <input id="chat-input" autoComplete="off" /><button onClick={handleSubmit}>Send</button>
            </form> */}
        </div>   
    )
}

