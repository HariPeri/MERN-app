/* eslint-disable no-lonely-if */
/* eslint-disable no-underscore-dangle */
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';
import { BsFilter } from 'react-icons/bs';
import { motion } from 'framer-motion';
import Navbar from '../shared/Navbar';
import CardInfo from '../shared/CardInfo';
import { TDeck } from '../shared/TDeck';
import { FilterOption } from '../shared/types';
import useAuthContext from '../hooks/useAuthContext';
import Footer from '../shared/Footer';

function PlayerCards() {
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

    // Prevents continuous rendering since filterOptions is a dependency of the useEffect hook
    const filterOptions = useMemo<FilterOption[]>(
        () => [
            { label: 'All Cards', value: 'allCards' },
            { label: 'Base Parallel', value: 'Base Parallel' },
            { label: 'Relic', value: 'Relic' },
            { label: 'Autograph', value: 'Autograph' },
            { label: 'Insert Parallel', value: 'Insert Parallel' },
            { label: 'Relic Autograph', value: 'Relic Autograph' },
        ],
        []
    );
    const { id } = useParams(); // destructures out the id using the useParams hook [path -> cards/:id]
    const [cards, setCards] = useState<TDeck[]>([]); // useState to hold the statae of all cards
    const [filteredCards, setFilteredCards] = useState<TDeck[]>([]);
    const [selectedFilters, setSelectedFilters] = useState<string[]>([
        'allCards',
    ]);
    const [playerCardsStyles, setPlayerCardsStyles] = useState<string>('');
    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

    useEffect(() => {
        // Check conditions and set playerCardsStyles accordingly
        if (showAddCard) {
            setPlayerCardsStyles(
                'mt-16 mb-8 flex gap-8 ml-12 flex-wrap text-white font-xl italic'
            );
        } else if (filteredCards.length === 0) {
            setPlayerCardsStyles(
                'mt-16 mb-[575px] flex gap-8 ml-12 flex-wrap text-white font-xl italic'
            );
        } else {
            setPlayerCardsStyles(
                'mt-16 mb-64 flex gap-8 ml-12 flex-wrap text-white font-xl italic'
            );
        }
    }, [showAddCard, filteredCards]);

    const handleToggleFilters = () => {
        setIsFilterOpen((prevIsFilterOpen) => !prevIsFilterOpen);
    };

    const toggleFilter = (filter: string) => {
        if (filter === 'allCards') {
            setSelectedFilters((prevFilters) =>
                prevFilters.includes('allCards') ? [] : ['allCards']
            );
        } else {
            setSelectedFilters((prevFilters) => {
                if (prevFilters.includes('allCards')) {
                    const newFilters = [filter];
                    return newFilters;
                }
                // Toggle the individual filter
                if (prevFilters.includes(filter)) {
                    return prevFilters.filter((item) => item !== filter);
                }
                return [...prevFilters, filter];
            });
        }
    };

    const applyFilters = () => {
        if (selectedFilters.includes('allCards')) {
            setFilteredCards(cards);
        } else {
            setFilteredCards(
                cards.filter((card) => selectedFilters.includes(card.cardType))
            );
        }

        setIsFilterOpen(!isFilterOpen);
    };

    useEffect(() => {
        // Only happens on first render [empty Dependencies array]
        async function fetchCards() {
            const res = await fetch(`http://localhost:3001/cards/${id}`);
            const playerscards = await res.json();
            setCards(playerscards);
            setFilteredCards(playerscards);
        }
        fetchCards();
    }, [id]);

    return (
        <div className="relative">
            <Navbar />
            {/* Render filter options as checkboxes */}
            <div className="absolute right-0 w-[200px] ml-auto mt-8 mr-10 z-[1]">
                <button
                    type="button"
                    className="cursor-pointer flex items-center text-white"
                    onClick={handleToggleFilters}
                >
                    <span className="mr-2">Set Filters</span>
                    <BsFilter />
                </button>
                {isFilterOpen && (
                    <motion.div
                        className="z-[-1]"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5 }}
                        variants={{
                            hidden: { opacity: 0, y: -25 },
                            visible: { opacity: 1, y: 0 },
                        }}
                    >
                        <div className="bg-union-gold p-2">
                            {filterOptions.map((option) => (
                                <label
                                    key={option.value}
                                    className="flex items-center space-x-4 gap-2"
                                    htmlFor={`filter_${option.value}`}
                                >
                                    <input
                                        type="checkbox"
                                        id={`filter_${option.value}`}
                                        className="peer relative h-8 mb-4 w-8 shrink-0 appearance-none rounded-sm border after:absolute after:left-0 after:top-0 after:h-full after:w-full after:bg-[url('data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9JzMwMHB4JyB3aWR0aD0nMzAwcHgnICBmaWxsPSIjZmZmZmZmIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgdmVyc2lvbj0iMS4xIiB4PSIwcHgiIHk9IjBweCI+PHRpdGxlPmljb25fYnlfUG9zaGx5YWtvdjEwPC90aXRsZT48ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz48ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyBmaWxsPSIjZmZmZmZmIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgyNi4wMDAwMDAsIDI2LjAwMDAwMCkiPjxwYXRoIGQ9Ik0xNy45OTk5ODc4LDMyLjQgTDEwLjk5OTk4NzgsMjUuNCBDMTAuMjI2Nzg5MSwyNC42MjY4MDE0IDguOTczMTg2NDQsMjQuNjI2ODAxNCA4LjE5OTk4Nzc5LDI1LjQgTDguMTk5OTg3NzksMjUuNCBDNy40MjY3ODkxNCwyNi4xNzMxOTg2IDcuNDI2Nzg5MTQsMjcuNDI2ODAxNCA4LjE5OTk4Nzc5LDI4LjIgTDE2LjU4NTc3NDIsMzYuNTg1Nzg2NCBDMTcuMzY2ODIyOCwzNy4zNjY4MzUgMTguNjMzMTUyOCwzNy4zNjY4MzUgMTkuNDE0MjAxNCwzNi41ODU3ODY0IEw0MC41OTk5ODc4LDE1LjQgQzQxLjM3MzE4NjQsMTQuNjI2ODAxNCA0MS4zNzMxODY0LDEzLjM3MzE5ODYgNDAuNTk5OTg3OCwxMi42IEw0MC41OTk5ODc4LDEyLjYgQzM5LjgyNjc4OTEsMTEuODI2ODAxNCAzOC41NzMxODY0LDExLjgyNjgwMTQgMzcuNzk5OTg3OCwxMi42IEwxNy45OTk5ODc4LDMyLjQgWiI+PC9wYXRoPjwvZz48L2c+PC9nPjwvc3ZnPg==')] checked:after:bg-[length:40px] checked:after:bg-center checked:after:bg-no-repeat checked:after:content-[''] checked:bg-union-blue hover:ring hover:ring-gray-300 focus:outline-none"
                                        checked={selectedFilters.includes(
                                            option.value
                                        )}
                                        onChange={() =>
                                            toggleFilter(option.value)
                                        }
                                    />
                                    <label
                                        htmlFor={`filter_${option.value}`}
                                        className="w-full cursor-pointer font-medium text-white"
                                    >
                                        {option.label}
                                    </label>
                                </label>
                            ))}
                        </div>
                        <div className="bg-blue-200 rounded-b-2xl">
                            <button
                                type="button"
                                className="ml-10 my-4 w-32 border-black border-2 p-3 rounded-md bg-white hover:bg-gray-300 transition-all duration-500"
                                disabled={selectedFilters.length === 0}
                                onClick={applyFilters}
                            >
                                Apply Filters
                            </button>
                            {selectedFilters.length === 0 && (
                                <div className=" text-red-500 text-center">
                                    Please select an option
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </div>

            <ul className={playerCardsStyles}>
                {filteredCards.length === 0 ? (
                    <li>
                        No Cards in your Collection match the selected filters.
                    </li>
                ) : (
                    filteredCards.map((card) => (
                        <li key={card._id}>
                            <CardInfo
                                frontCardImage={card.frontCardImage}
                                playername={card.playerName}
                                orientation={card.orientation}
                            />
                        </li>
                    ))
                )}
            </ul>
            {showAddCard && (
                <Link to="/add-card">
                    <button
                        type="button"
                        className="ml-10 mb-[575px] w-32 border-black border-2 p-3 rounded-md bg-white hover:bg-gray-300 transition-all duration-500"
                    >
                        Add Card
                    </button>
                </Link>
            )}
            <Footer />
        </div>
    );
}

export default PlayerCards;
