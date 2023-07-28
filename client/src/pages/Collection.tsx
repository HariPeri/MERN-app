/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import { TPlayer } from '../shared/TPlayer';
import PlayerInfo from '../shared/PlayerInfo';

function Collection() {
    const [players, setPlayers] = useState<TPlayer[]>([]);

    useEffect(() => {
        // Only happens on first render [empty Dependencies array]
        async function fetchPlayers() {
            const res = await fetch('http://localhost:3001/players');
            const newPlayers = await res.json();
            setPlayers(newPlayers);
        }

        fetchPlayers();
    }, []);

    return (
        <div>
            <Navbar />
            <ul className="cards mt-8 mb-8 flex gap-8 ml-12 flex-wrap">
                {players.map((player: TPlayer) => (
                    <li key={player._id}>
                        <Link to={`/cards/${player._id}`}>
                            <PlayerInfo player={player} />
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Collection;
