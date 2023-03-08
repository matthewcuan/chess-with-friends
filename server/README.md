## TODO

[X] Set up mongo
[X] Set up routes

## Packages

[ ] uuid (for generating unique ids for users)
[X] nodemon (for automatically restarting node app when changed)

## Server Structure

├── api
│   ├── users.controller.js 
│   ├── users.routes.js
│   ├── games.controller.js
│   ├── games.routes.js
├── dao
│   ├── usersDAO.js
│   ├── gamesDAO.js
├── index.js
├── server.js
├── node_modules
├── package.json
├── package-lock.json
└── .gitignore

## Terminal route test

curl -X POST http://localhost:8000/api/v1/games/save -H "Content-Type: application/json" -d '{"title": "test", "type": "public", "players": "player 1, player 2", "history": "history"}