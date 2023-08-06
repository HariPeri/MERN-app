/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import { TPlayer } from '../shared/TPlayer';
import PlayerInfo from '../shared/PlayerInfo';
import PlayerInfoLoader from '../shared/Skeleton Loaders/PlayerInfoLoader';
import Footer from '../shared/Footer';

function Collection() {
    const [players, setPlayers] = useState<TPlayer[]>([]);
    const [isLoading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        // Only happens on first render [empty Dependencies array]
        async function fetchPlayers() {
            setLoading(true);
            const res = await fetch('http://localhost:3001/players');
            const newPlayers = await res.json();
            setPlayers(newPlayers);
            setLoading(false);
        }

        fetchPlayers();
    }, []);

    return (
        <div>
            <Navbar />
            {!isLoading ? (
                <ul className="mt-8 mb-96 flex gap-8 ml-12 flex-wrap">
                    {players.map((player: TPlayer) => (
                        <li key={player._id}>
                            <Link to={`/cards/${player._id}`}>
                                <PlayerInfo player={player} />
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <div className="mt-8 mb-96 flex gap-8 ml-12 flex-wrap">
                    {[...Array(10)].map((_, index) => (
                        <PlayerInfoLoader key={`${index}-${Date.now()}`} />
                    ))}
                </div>
            )}

            <Footer />
        </div>
    );
}

export default Collection;
