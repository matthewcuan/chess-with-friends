# About

Two player chess MERN full stack web app played on separate or a single device.

## Features

- Players:

    - Can move their own chess pieces according to the rules of chess and the constraints of the board
    - Can choose the amount of time (5min, 10min, unlimited)
    -----
    - Can review moves during the game
    - Can review games after the game has ended
    - Can send links to other players to play against them
    - Can create and login to personal accounts

- App: 

    - Logs each chess move in sequential order (to be stored and accessed in mongo)
    - Displays time remaining for each player
    ------
    - Detects a check or checkmate
    - Prevents a player from moving into a compromising position (checkmate or check)
    - Saves each match (includes players and moves in sequence)