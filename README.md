## To do

[X] Set up react app
[X] Write logic for chess game
[X] Build pages for front end
[ ] Complete login mechanism
[ ] Connect to backend

## Packages

[X] use fetch api from js (for requests to server)
[X] universal-cookie (for user authentication)
- stream-chat (for live chat)
[X] react-router-dom (for routes)

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

## Flow

- User opens web app and chooses between:
    1. Logging in
        a. Enter username (getUser) (../)
            - checks if username exists in db
            - routes to password page with username as a param
        b. Enter password (getUser) (../password/:user)
            - compares input password with password associated with user account
        c. Enters profile page (../profile/:user)
            - can choose between:
                1. starting a game
                2. joining a game
                3. logging out
            - all games (public + private) displayed below options
                1. user can choose to filter which games appear 
    2. Signing up
        a. Enters username and password (addUser) (../signup)
            - posts new account into db to be accessed later on login
        b. Enters profile page (../profile/:user): see 1c above
    3. Viewing public games
        a. Displays all publicly saved games