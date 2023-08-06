import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../shared/Navbar';
import { TDeck } from '../shared/TDeck';
import CardInfo from '../shared/CardInfo';
import useAuthContext from '../hooks/useAuthContext';
import Footer from '../shared/Footer';

function RecentAdditions() {
    const [cards, setCards] = useState<TDeck[]>([]);
    const [showAddCard, setShowAddCard] = useState<boolean>(false);

    const personalEmail = import.meta.env.VITE_REACT_APP_PERSONAL_EMAIL;

    const {
        state: { user },
    } = useAuthContext();

    const userEmail = user?.email;

    useEffect(() => {
        if (userEmail === personalEmail) {
            setShowAddCard(true);
        } else setShowAddCard(false);
    }, [userEmail, personalEmail]);

    const cardStyles = showAddCard
        ? 'mt-16 mb-8 flex gap-8 ml-12 flex-wrap text-white font-xl italic'
        : ' mt-16 mb-64 flex gap-8 ml-12 flex-wrap text-white font-xl italic';

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
            <ul className={cardStyles}>
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
            {showAddCard && (
                <Link to="/add-card">
                    <button
                        type="button"
                        className="ml-10 mb-48 w-32 border-black border-2 p-3 rounded-md bg-white hover:bg-gray-300 transition-all duration-500"
                    >
                        Add Card
                    </button>
                </Link>
            )}
            <Footer />
        </div>
    );
}

export default RecentAdditions;
