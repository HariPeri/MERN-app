import HomeCardsCarousel from '../../shared/HomeCardsCarousel';
import Navbar from '../../shared/Navbar';
import CollectionTyping from './CollectionTyping';
import SoccerParticlesBackground from './SoccerParticlesBackground';

function Home() {
    return (
        <>
            <SoccerParticlesBackground />
            <div className="relative">
                <Navbar />
                <div className="mt-24">
                    <HomeCardsCarousel />
                </div>
                <div className="mt-24">
                    <CollectionTyping />
                </div>
            </div>{' '}
        </>
    );
}

export default Home;
