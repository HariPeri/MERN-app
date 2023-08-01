/* eslint-disable no-underscore-dangle */
import { useState } from 'react';
import homeCards from './HomeCards';
import { THomeCard } from './THomeCard';

function HomeCardsCarousel() {
    const carouselLength = homeCards.length;

    const [activeIndex, setActiveIndex] = useState<number>(
        Math.floor(carouselLength / 2)
    );

    const handlePrevClick = () => {
        setActiveIndex(
            (prevIndex) => (prevIndex - 1 + carouselLength) % carouselLength
        );
        console.log('New Active Index after prev: ', activeIndex);
    };

    const handleNextClick = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % carouselLength);
        console.log('New Active Index next:', activeIndex);
    };

    const displayedCards = [-1, 0, 1].map((offset) => {
        const index = (activeIndex + offset + carouselLength) % carouselLength;
        return homeCards[index];
    });

    return (
        <div className="relative w-1/2 mx-auto">
            <div className="flex transition-transform duration-300">
                {displayedCards.map((card: THomeCard, index) => (
                    <div
                        key={card._id}
                        className={`flex-shrink-0 border border-gray-300 rounded-lg shadow-lg ${
                            index === 1 ? 'transition scale-110' : 'scale-75'
                        } ${index === 0 ? '-rotate-12' : ''} ${
                            index === 2 ? 'rotate-12' : ''
                        } ${index !== 1 ? 'mx-12 opacity-50' : ''}`}
                    >
                        <img
                            src={card.frontCardImage}
                            alt={`${index + 1} is not available`}
                            className="object-cover rounded-lg"
                        />
                    </div>
                ))}
            </div>
            <button
                type="button"
                className="absolute top-1/2 left-0 transform -translate-y-1/2 px-2 py-1 bg-gray-900 text-white rounded-l-lg"
                onClick={handlePrevClick}
            >
                Prev
            </button>
            <button
                type="button"
                className="absolute top-1/2 right-0 transform -translate-y-1/2 px-2 py-1 bg-gray-900 text-white rounded-r-lg"
                onClick={handleNextClick}
            >
                Next
            </button>
        </div>
    );
}

export default HomeCardsCarousel;
