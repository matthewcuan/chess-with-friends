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

## TODO

[X] Set up login mechanism
    - User should be able to:
        [X] Create an account -> account information is saved to db
            1. Check if the username already exists in the db (getUser)
            2. If it is not, create a new account (postUser)
        [X] Login -> user logins into their account and in theory will be able to play games and access past private and public games 
            1. Check if user exists
            2. Check if password is correct
            3. Enter profile/game page
    [X] Create operations in api and dao files
    [X] Connect backend to mongo
    [X] Configure client to take inputs and send to server
    [X] Connect client to server

[X] Set up multiplayer feature (combination of frontend + backend; should not require database)
    - Once the user logins or sign ups:
        [X] They will be greeted by a basic profile page where they can:
            [X] Start a game
                1. A new game is created (with a unique id)
                2. The user is provided with the code
                3. The user sends the code to the other user
                4. Once the other user enters the game, the game starts
            [X] Join a game
                1. The user receives the code from the inviting user
                2. The user inputs the code
                3. The game starts
            [ ] Change their password
                1. User inputs their old password (getUser checks if password is correct)
                2. User inputs their new password (updateUser updates password)
            [X] Log out
                1. User returns to home/login page

[X] Implement actual multiplayer chess feature
    [X] Player starts game 
        1. Randomize which player is black and which is white and orient board in correct position for each player
        2. Display "Game initiated... waiting for other player" in chat
    [X] Second player joins game
        1. Board should be orientated correctly
        2. Display "Game started... white's move" in chat
        3. No other players should be able to join/play (maybe implement a view mode later)
    [X] Game begins
        1. White makes move -> fen string emitted
        2. Screens for both players should be updated to new positions 
    [ ] Game ends
        1. Display "${winner} won!"
        2. Display options to rematch in same room or exit to home page

[ ] Implement gave saves. 
    1. Game ends and user is presented with 3 save options:
        [ ] Public save
            - savePublicGame -> game saved to game db with public tag, anyone can access it from the login page
        [ ] Private save
            - savePrivateGame -> game saved to db with private tag, only player can access when logged in
        [ ] Don't save
            - the game is not saved and the user is presented with the below options 
    2. After choosing one of the above options:
        [ ] New game
            - board is reset
        [ ] Exit room
            - return to home page


