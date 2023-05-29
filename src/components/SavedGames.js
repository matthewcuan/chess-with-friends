import React, { useState, useRef, useEffect } from 'react';
import { GAMES_API_URL, HOST_URL } from '../utils/constants';
import Cookies from 'universal-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Arrow from "../assets/icons/arrow.png";
import { motion } from "framer-motion";

function SavedGames() {

    const [configuration, setConfiguration] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const cookies = new Cookies();
    const user = cookies.get("USER");
    const [hidden, setHidden] = useState(true);
    const gamesRef = useRef(null);
    const tableRef = useRef(null);
    const navigate = useNavigate();

    const fetchGames = (config) => {
        setIsLoading(true);
        console.log("fetching games")
        axios(config)
            .then((response) => {
                for (let i = (response.data.length - 1); i >= 0; i--) {
                    const data = response.data[i];
                    
                    const row = document.createElement('tr');
                    const datetime = document.createElement('td');
                    datetime.innerText = data.datetime;

                    const player = document.createElement('td');
                    player.innerText = data.player1;

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

                    if (!hidden) {
                        row.appendChild(player);
                    }

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
            setHidden(false);
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

    return (
        
        <div className="saved-screen">
            <motion.aside
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: .5 }}
                className="saved-screen"
            >
                <table className='table'>
                <thead>
                    <tr>
                        <th>Date + Time</th>
                        <th className={hidden ? 'hidden' : ''}>Player</th>
                        <th>Opponent</th>
                        <th>Winner</th>
                        <th>History</th>
                    </tr>
                </thead>
                <tbody ref={tableRef}>
                </tbody>
            </table>
            </motion.aside>
            <div className="buttons account-actions">
                <button className="account-button text-left" onClick={() => navigate("/home")}>
                    <img className="icon" src={Arrow}></img>
                    Return Home
                </button>
            </div>
        </div>
    )
}

export default SavedGames