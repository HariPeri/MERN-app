import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import { TDeck } from '../shared/TDeck';
import CardInfo from '../shared/CardInfo';

function App() {
    const [cards, setCards] = useState<TDeck[]>([]);

    useEffect(() => {
        // Only happens on first render [empty Dependencies array]
        async function fetchCards() {
            const res = await fetch(`http://localhost:3001/cards`);
            const newCards = await res.json();
            setCards(newCards);
        }

        fetchCards();
    }, []);

    return (
        <div className="App h-full">
            <Navbar />
            <ul className="cards mt-8 mb-8 flex gap-8 ml-12 flex-wrap">
                {cards.map((card) => (
                    <li
                        // eslint-disable-next-line no-underscore-dangle
                        key={card._id}
                    >
                        <CardInfo
                            frontCardImage={`${card.frontCardImage}`}
                            playername={`${card.playerName}`}
                        />
                    </li>
                ))}
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

export default App;
