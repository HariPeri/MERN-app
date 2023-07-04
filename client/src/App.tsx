import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type TDeck = {
    frontCardImage: string;
    backCardImage: string;
    _id: string;
    playerName: string;
    year: string;
    cardSet: string;
    cardType: string;
    color: string;
    cardNumber: string;
    cardNumberedOutOf: string;
    dateAcquired: string;
};

function App() {
    const [cards, setCards] = useState<TDeck[]>([]);

    useEffect(() => {
        // Only happens on first render [empty Dependencies array]
        async function fetchCards() {
            const res = await fetch('http://localhost:3001/cards');
            const newCards = await res.json();
            setCards(newCards);
        }

        fetchCards();
    }, []);

    return (
        <div className="App h-full">
            <ul className="cards py-5 flex gap-8 ml-5 flex-wrap">
                {cards.map((card) => (
                    <li
                        className="rounded-md h-36 w-36 bg-blue-300 flex items-center justify-center"
                        // eslint-disable-next-line no-underscore-dangle
                        key={card._id}
                    >
                        {card.playerName}
                    </li>
                ))}
            </ul>
            <Link to="/addCard">
                <button
                    type="button"
                    className="ml-10 border-black border-2 p-3 rounded-md hover:bg-gray-300 transition-all duration-500"
                >
                    Add Card
                </button>
            </Link>
        </div>
    );
}

export default App;
