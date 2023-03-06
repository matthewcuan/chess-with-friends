import dotenv from 'dotenv'
// import app from "./server.js"
import mongodb from "mongodb"
import UsersDAO from "./dao/usersDAO.js"
import express from "express"
import cors from "cors"
import users from "./api/users.routes.js"
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config()
const MongoClient = mongodb.MongoClient
const chess_username = process.env.CHESS_ID
const chess_password = process.env.CHESS_KEY
const uri = `mongodb+srv://${chess_username}:${chess_password}@cluster0.mqza9mv.mongodb.net/?retryWrites=true&w=majority`

const port = 8000

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true,
    }
});

app.use(cors());
app.use(express.json());

MongoClient.connect(
    uri,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500,
        useNewUrlParser: true
    })
.catch(err => {
    console.error(err.stack)
    process.exit(1)
})
.then(async client => {
    await UsersDAO.injectDB(client)
    app.listen(port, () => {
        console.log(`listening on port ${port}`)
    })
})
.then(() => {
    io.on("connection", (socket) => {
        console.log('a user connected');
        
        socket.on("createNewGame", (gameId) => {
            // if (socket.adapter.sids.size < 2) {
            //     socket.join(gameId);
            //     console.log(`a user joined room ${gameId}`);
            // }
            socket.join(gameId);
            console.log(`a user joined room ${gameId}`);
            console.log(socket.adapter.sids.size)

        });

        socket.on('new move', (fen) => {
            console.log("a new move was made");
            io.emit('new move', fen);
        })

        socket.on('chat message', (msg) => {
            console.log('message: ' + msg);
            io.emit('chat message', msg);
        });

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });

        socket.on('game chat message', (msg) => {
            console.log('message: ' + msg[0]);
            io.to(`${msg[1]}`).emit('game chat message', msg[0]);
        }
            
        )
      });

    app.use("/api/v1/users", users);
    app.use("*", (req, res) => res.status(404).json({ error: "not found" }));
    
    server.listen(5000, () => {
        console.log("Server listening on port 5000");
    });
});


