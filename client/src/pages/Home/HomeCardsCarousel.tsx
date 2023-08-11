/* eslint-disable no-underscore-dangle */
import { useState, useEffect } from 'react';
import homeCards from './HomeCards';
import { THomeCard } from './HomeTypes/THomeCard';

function HomeCardsCarousel() {
    const carouselLength = homeCards.length;

    const [activeIndex, setActiveIndex] = useState<number>(
        Math.floor(carouselLength / 2)
    );

    const intervalDuration = 3000; // 5 seconds, for example

    useEffect(() => {
        // Function to handle automatic card switching
        const autoSwitchCards = () => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % carouselLength);
        };

        // Set up the interval
        const intervalId = setInterval(autoSwitchCards, intervalDuration);

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [carouselLength]);

    const displayedCards = [-1, 0, 1].map((offset) => {
        const index = (activeIndex + offset + carouselLength) % carouselLength;
        return homeCards[index];
    });

    return (
        <div className="w-1/2 mx-auto">
            <div className="flex transition-transform duration-300">
                {displayedCards.map((card: THomeCard, index) => (
                    <div
                        key={card._id}
                        className={`border border-gray-300 rounded-lg shadow-lg ${
                            index === 1
                                ? 'transition scale-110 hover:scale-125'
                                : 'scale-75'
                        } ${index === 0 ? '-rotate-12' : ''} ${
                            index === 2 ? 'rotate-12' : ''
                        } ${index !== 1 ? 'mx-12 opacity-50' : ''}`}
                    >
                        <img
                            src={card.frontCardImage}
                            alt={`${index + 1} is not available`}
                            width="240"
                            className="object-cover rounded-lg"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HomeCardsCarousel;
