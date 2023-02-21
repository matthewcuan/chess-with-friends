## To do

[X] Set up react app

[X] Write logic for chess game
[ ] Build pages for front end
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
│   │   ├── game.js
│   │   ├── game_page.js
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
/password   | getUser -> checks if player input correct password
/game       | 
/signup     | addUser -> add player's login info to db
/history    |