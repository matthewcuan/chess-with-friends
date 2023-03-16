import React, { useEffect, useState } from 'react';
import { Chessboard } from "react-chessboard";
import axios from 'axios';
import { GAMES_API_URL } from '../utils/constants';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

export default function ReviewHistory() {

    const [history, setHistory] = useState([]);
    const [board, setBoard] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
    const [move, setMove] = useState(0);
    const [historyFetched, setHistoryFetched] = useState(false);
    const cookies = new Cookies();
    const reviewId = cookies.get('REVIEW ID')
    const navigate = useNavigate();

    useEffect(() => {
        if (!historyFetched) {
            const configuration = {
                method: "get",
                url: GAMES_API_URL + `/game/${reviewId}`
            };
    
            axios(configuration)
            // if game exists
            .then((response) => {
                setHistory(response.data.history);
                setBoard(history[0]);
                console.log(history[0]);
                console.log(board);
                setHistoryFetched(true);
            })
            // if user does not exist
            .catch((error) => {
                alert("User not found. Sign up for an account.")
                console.log("error fetching user from db")
                return ;
         })
        }
        
    }, [historyFetched])
    
    console.log(board)

    function handleNext() {
        console.log(history.length)
        console.log(move + 1)
        if ((move + 1) < history.length) {
            setMove(move => move + 1);
            setBoard(history[move + 1]);
            console.log(move + 1);
        } else {
            alert("You've reached the end of the game.")
        }
    }

    function handlePrevious() {
        if (move - 1 >= 0) {
            setMove(move => move - 1);
            setBoard(history[move - 1]);
            console.log(move - 1)
        } else {
            alert("This is the beginning of the game.")
        }
    }

  return (
    <div className="main">
        <div className="review-board">
            <Chessboard 
                position={board}
                arePiecesDraggable={false}
            />
            <div className="buttons">
                <button onClick={handlePrevious}>
                    &#x2190; Previous Move
                </button>
                <button onClick={handleNext}>
                    Next Move &#x2192;
                </button>
            </div>  
            <button onClick={() => navigate('/saved')}>
                Return to Saved Games
            </button>
        </div>   
           
    </div>
  )
}

