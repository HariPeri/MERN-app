/* eslint-disable no-underscore-dangle */
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from '../shared/Navbar';
import CardInfo from '../shared/CardInfo';
import { TDeck } from '../shared/TDeck';

function PlayerCards() {
    const { id } = useParams();
    const [cards, setCards] = useState<TDeck[]>([]);

    useEffect(() => {
        // Only happens on first render [empty Dependencies array]
        async function fetchCards() {
            const res = await fetch(`http://localhost:3001/cards/${id}`);
            const playerscards = await res.json();
            setCards(playerscards);
            // console.log(cardDataArray);
        }
        fetchCards();
    }, [id]);

    return (
        <div className="App h-full">
            <Navbar />
            <ul className="cards mt-8 mb-8 flex gap-8 ml-12 flex-wrap">
                {cards.length === 0 ? (
                    // If the "cards" array is empty, display a message or alternative content
                    <span className="text-2xl text-white italic">
                        No Cards in your collection yet
                    </span>
                ) : (
                    // If the "cards" array is not empty, map over the cards and render them
                    cards.map((card) => (
                        <li key={card._id}>
                            <CardInfo
                                frontCardImage={`${card.frontCardImage}`}
                                playername={`${card.playerName}`}
                            />
                        </li>
                    ))
                )}
            </ul>
            <Link to="/addCard">
                <button
                    type="button"
                    className="ml-10 w-32 border-black border-2 p-3 rounded-md bg-white hover:bg-gray-300 transition-all duration-500"
                >
                    Add Card
                </button>
            </Link>
        </div>
    );
}

export default PlayerCards;
