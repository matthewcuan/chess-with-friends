import dotenv from 'dotenv'
import mongodb from "mongodb"
import UsersDAO from "./dao/usersDAO.js"
import GamesDAO from "./dao/gamesDAO.js"
import express from "express"
import cors from "cors"
import users from "./api/users.routes.js"
import games from "./api/games.routes.js"
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

function blackOrWhite() {
    const number = Math.floor(Math.random() * 9);
    if (number > 4) {
        return "white";
    } else {
        return "black";
    }
}

var orientation = blackOrWhite();
var user = "";
var gameId = "";


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
    await GamesDAO.injectDB(client)
    app.listen(port, () => {
        console.log(`mongo listening on port ${port}`)
    })
})
.then(() => {
    io.on("connection", (socket) => {
        console.log('a user connected');

        var history = [];
        
        socket.on("createNewGame", (game) => {
            var room = socket.adapter.rooms.get(`${game.id}`); // get the room object
            user = game.user;
            gameId = game.id;

            if (!room) {
                socket.join(game.id);
                io.to(socket.id).emit('board position', orientation);
                io.to(socket.id).emit('message', "Game initiated... waiting for other player");
                room = socket.adapter.rooms.get(`${game.id}`);
            }

            if (parseInt(room.size) < 2) {
                socket.join(game.id);
                console.log(orientation);
                console.log(room.size);
                if (parseInt(room.size) === 1) {
                    console.log("changing orientation")
                    if (orientation === "white") {
                        orientation = "black";
                    } else {
                        orientation = "white";
                    }
                } else {                    
                    io.to(socket.id).emit('board position', orientation);
                    io.to(socket.id).emit('message', "Joined! Game started... white's move");
                    socket.broadcast.to(game.id).emit('message', game.user + " joined! Game started... white's move")
                }
                
                console.log(`${game.user} joined room ${game.id}`);
            } else {
                console.log("room full");
                io.to(socket.id).emit('room full', "This game is full. Please try another room!")
                return ;
            }

            console.log(socket.adapter.rooms.get(`${game.id}`).size);

        });

        socket.on('new move', (fen) => {
            console.log("a new move was made");
            io.emit('new move', fen);
            history = [...history, fen];
        })

        socket.on('chat message', (msg) => {
            console.log('message: ' + msg);
            io.emit('chat message', msg);
        });

        socket.on('disconnect', () => {
            console.log("sending history");
            io.to(gameId).emit('history', history);
            socket.broadcast.to(gameId).emit('message', "Opponent left. You won by abandonment.");
            socket.broadcast.to(gameId).emit('end game');
            io.to(gameId).emit('save options');
            console.log('user disconnected');
            console.log(socket.adapter.sids.size);
            io.to(gameId).emit('end game');
        });

        socket.on('exit message', (msg) => {
            io.to(socket.id).emit('message', msg);
        })

        socket.on('game end', (msgs) => {
            io.to(socket.id).emit('message', msgs.winner);
            socket.broadcast.to(gameId).emit('message', msgs.loser)
            io.to(gameId).emit('save options');
            io.to(gameId).emit('end game');
            console.log("sending history")
            io.to(gameId).emit('history', history);
        })

        socket.on('restart game', () => {
            console.log("restarting")
            io.to(gameId).emit('message', "New game started.");
            io.to(gameId).emit('end game');
        })

        socket.on('message', (msg) => {
            console.log('message: ' + msg.chat + " to " + msg.gameId);
            io.to(gameId).emit('message', msg.chat);
        });
      });

    app.use("/api/v1/users", users);
    app.use("/api/v1/games", games);
    app.use("*", (req, res) => res.status(404).json({ error: "not found" }));
    
    server.listen(5000, () => {
        console.log("socket listening on port 5000");
    });
});


