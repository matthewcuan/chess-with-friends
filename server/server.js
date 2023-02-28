import express from "express"
import cors from "cors"
import users from "./api/users.routes.js"
import { createServer } from "http";
import { Server } from "socket.io";
// import "socket.js";

const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/v1/users", users)
app.use("*", (req, res) => 
res.status(404).json({error: "not found"}))

const server = createServer(app);
const io = new Server(server, { 
    cors: { origin: "*" }
});

io.on("connection", (socket) => {
    console.log(`Client ${socket.id} connected`);

  // Handle join room event
  socket.on("joinRoom", ({ roomId }) => {
    socket.join(roomId);
    console.log(`Client ${socket.id} joined room ${roomId}`);
  });
});
  
server.listen(3030)

export default app