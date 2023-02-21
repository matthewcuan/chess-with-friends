## To do

[X] Set up react app
[X] Write logic for chess game
[X] Build pages for front end
[ ] Complete login mechanism
[ ] Connect to backend

## Packages

- use fetch api from js (for requests to server)
- universal-cookie (for user authentication)
- stream-chat (for live chat)
- react-router-dom (for routes)

## Client Structure

├── src
│   ├── components 
│   │   ├── login.js
│   │   ├── sign_up.js
│   │   ├── profile.js
│   │   ├── game.js
│   │   ├── game_history.js
│   ├── index.js
│   ├── index.css
│   ├── app.js
│   ├── app.css
├── public
│   ├── index.html
│   ├── mainfest.json
│   ├── robots.txt
├── node_modules
├── package.json
├── package-lock.json 
└── .gitignore

## Routes

PATHS         OPERATIONS
------------------------
/           | getAllUsers -> checks if player has an account
/password   | getUserbyId -> checks if player input correct password
/profile/:id| getGameById -> returns games played by player
/game       | postGame -> adds game history to db
/signup     | addUser -> add player's login info to db
/history    | getGames -> returns all public games