import React, { useState, useEffect, useRef } from 'react';
import Cookies from 'universal-cookie';
import { Form, Button } from "react-bootstrap";

export default function Chat(socket, gameId) {

    const cookies = new Cookies();
    const nickname = cookies.get("USER");
    const [message, setMessage] = useState("");
    const messagesRef = useRef(null);

    useEffect(() => {
        console.log(socket);

        socket.on('chat message', (msg) => {
            const item = document.createElement('li');
            item.textContent = msg;
            console.log("adding message")
            messagesRef.current.appendChild(item);
            window.scrollTo(0, document.body.scrollHeight);
        });        

    }, [socket]);

    function handleSubmit(event) {
        event.preventDefault();
        if (message.trim()) {
            var chat = nickname + ": " + message;
            console.log("emitting message")
            socket.to(`${gameId}`).emit('chat message', chat);
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
            </Form>
        </div>   
    )
}

