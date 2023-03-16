import React, { useState, useRef, useEffect } from 'react';
import { GAMES_API_URL, HOST_URL } from '../utils/constants';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SavedGames() {

    const [configuration, setConfiguration] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const cookies = new Cookies();
    const user = cookies.get("USER");
    const gamesRef = useRef(null);
    const tableRef = useRef(null);
    const navigate = useNavigate();

    const fetchGames = (config) => {
        setIsLoading(true);
        console.log("fetching games")
        axios(config)
            .then((response) => {
                
                console.log(response);
                console.log(response.data);
                console.log(response.data.length);
                for (let i = (response.data.length - 1); i >= 0; i--) {
                    const data = response.data[i];
                    console.log(data)

                    const row = document.createElement('tr');
                    const datetime = document.createElement('td');
                    datetime.innerText = data.datetime;

                    const opponent = document.createElement('td');
                    opponent.innerText = data.player2;
                    
                    const winner = document.createElement('td');
                    winner.innerText = data.winner;

                    const history = document.createElement('td');
                    const review_button = document.createElement('button');
                    review_button.innerText = data.type;
                    review_button.onclick = () => {
                        cookies.set('REVIEW ID', data._id, {
                            path: HOST_URL + '/review'
                        })
                        navigate('/review')
                    };
                    history.appendChild(review_button)

                    row.appendChild(datetime);
                    row.appendChild(opponent);
                    row.appendChild(winner);
                    row.appendChild(history);
                    tableRef.current.appendChild(row);
                }
                setIsLoading(false);
            })
            .catch((error) => {
                console.log("error fetching games from db");
                setIsLoading(false);
            })
    }

    useEffect(() => {
        if (!user) {
            console.log("getting public games")
            setConfiguration({
                method: "get",
                url: GAMES_API_URL + `public-games`
            });
        } else {
            console.log("getting user games")
            setConfiguration({
                method: "get",
                url: GAMES_API_URL + `${user}`
            });
        }
    }, [user])

    useEffect(() => {
        if (configuration) {
            fetchGames(configuration);
        }
    }, [configuration])

    // useEffect(() => {
    //     if (!user) {
    //         console.log("getting public games")
    //         setConfiguration({
    //             method: "get",
    //             url: GAMES_API_URL + `public-games`
    //         });
    //     } else {
    //         console.log("getting user games")
    //         setConfiguration({
    //             method: "get",
    //             url: GAMES_API_URL + user
    //         });
    //     }
    
    //     axios(configuration)
    //     // if user exists
    //     .then((response) => {
    //         console.log(response)
    //         for (let i = 0; i < response.data.length; i++) {
    //             const game = document.createElement('li');
    //             game.innerText = response.data[i].slice(0, -1);
    //             gamesRef.current.appendChild(game);
    //         } 
    //     })
    //     // if user does not exist
    //     .catch((error) => {
    //         console.log("error fetching games from db")
    //         return ;
    //     })
    // }, [])
    

    return (
        <div className="main">
            {isLoading && <p>Loading...</p>}
            <table className='table'>
                <thead>
                    <tr>
                        <th>Date + Time</th>
                        <th>Opponent</th>
                        <th>Winner</th>
                        <th>History</th>
                    </tr>
                </thead>
                <tbody ref={tableRef}>
                </tbody>
            </table>
            <ul id="chat-messages" ref={gamesRef}></ul>
            <button onClick={() => navigate('/home')}>
                Return Home
            </button>
        </div>
    )
}

export default SavedGames