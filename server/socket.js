let io
let gameSocket
let liveGames = []

const initGame = (sio, socket) => {
    
    io = sio;
    gameSocket = socket;

    gameSocket.on("createNewGame", createNewGame)
}

function createNewGame(gameId) {
    gameSocket.join(gameId);
}