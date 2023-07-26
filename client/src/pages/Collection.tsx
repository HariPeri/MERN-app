/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import Navbar from '../shared/Navbar';
import { TPlayer } from '../shared/TPlayer';
import PlayerInfo from '../shared/PlayerInfo';

function Collection() {
    const [players, setPlayers] = useState<TPlayer[]>([]);

    useEffect(() => {
        // Only happens on first render [empty Dependencies array]
        async function fetchCards() {
            const res = await fetch('http://localhost:3001/players');
            const newPlayers = await res.json();
            setPlayers(newPlayers);
        }

        fetchCards();
    }, []);

    return (
        <div>
            <Navbar />
            <ul className="cards mt-8 mb-8 flex gap-8 ml-12 flex-wrap">
                {players.map((player: TPlayer) => (
                    <li
                        // eslint-disable-next-line no-underscore-dangle
                        key={player._id}
                    >
                        <PlayerInfo player={player} />
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Collection;
