import React, { useState } from 'react';
import io from 'socket.io-client'
import Cookies from 'universal-cookie';
import { Form, Button } from "react-bootstrap";

export default function GlobalChat() {

    const cookies = new Cookies();
    const nickname = cookies.get("USER");
    const [message, setMessage] = useState("");
    const [connected, setConnected] = useState(false);
    const [socket, setSocket] = useState("");
    
    if (!connected) {
        setSocket(io("http://localhost:5000"));
        setConnected(true);
    };

    // const form = document.getElementById('chat-form');
    const input = document.getElementById('chat-input');
    const messages = document.getElementById('chat-messages');
    
    // form.addEventListener('submit', function(e) {
    //     e.preventDefault();
    //     if (input.value) {
    //         var message = nickname.value + ": " + input.value;
    //            socket.emit('chat message', message);
    //         input.value = '';
    //     }
    // });

    function handleSubmit(event) {
        event.preventDefault();
        setMessage()
        if (input.value) {
            var chat = nickname + ": " + message;
            socket.emit('chat message', chat);
            setMessage("");
        }

        socket.on('chat message', function(msg) {
            var item = document.createElement('li');
            item.textContent = msg;
            messages.appendChild(item);
            window.scrollTo(0, document.body.scrollHeight);
        });
    }

    

    return (
        <div>
            <ul id="chat-messages"></ul>
            <Form id="chat-form" noValidate onSubmit={handleSubmit}>
                <Form.Group controlId="chat-input">
                    <Form.Control
                        // id="chat-input"
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

