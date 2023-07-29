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

function PlayerCards() {
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
    const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);

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
                    // If "All Cards" filter is selected, remove it and select only the clicked filter
                    let newFilters = prevFilters.filter(
                        (item) => item !== 'allCards'
                    );
                    newFilters = [filter];
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
            <div className="absolute right-0 w-[200px] ml-auto mt-8 mr-10">
                <button
                    type="button"
                    className="cursor-pointer flex items-center text-white"
                    onClick={handleToggleFilters}
                >
                    <span className="mr-2">Set Filters</span>
                    <BsFilter />
                </button>
                {isFilterOpen && (
                    <div>
                        <div className="bg-red-200 w-200">
                            {filterOptions.map((option) => (
                                <label
                                    key={option.value}
                                    className="flex items-center space-x-2"
                                    htmlFor={`filter_${option.value}`}
                                >
                                    <input
                                        type="checkbox"
                                        id={`filter_${option.value}`}
                                        className="form-checkbox h-4 w-4 text-blue-500"
                                        checked={selectedFilters.includes(
                                            option.value
                                        )}
                                        onChange={() =>
                                            toggleFilter(option.value)
                                        }
                                    />
                                    <span>{option.label}</span>
                                </label>
                            ))}
                        </div>
                        <div>
                            <button
                                type="button"
                                className="ml-10 w-32 border-black border-2 p-3 rounded-md bg-white hover:bg-gray-300 transition-all duration-500"
                                disabled={selectedFilters.length === 0}
                                onClick={applyFilters}
                            >
                                Apply Filters
                            </button>
                            {selectedFilters.length === 0 && (
                                <div className=" text-red-500">
                                    Please select an option
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <ul className="cards mt-16 mb-8 flex gap-8 ml-12 flex-wrap text-white font-xl italic">
                {filteredCards.length === 0 ? (
                    <li>
                        {' '}
                        No Cards in your Collection match the selected filters.{' '}
                    </li>
                ) : (
                    filteredCards.map((card) => (
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
