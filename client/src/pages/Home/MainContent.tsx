import { Link } from 'react-router-dom';
import HomeCardsCarousel from './HomeCardsCarousel';
import Navbar from '../../shared/Navbar';
import CollectionTyping from './CollectionTyping';
import SoccerParticlesBackground from './SoccerParticlesBackground';
import Carranza from '../../assets/Carranza-removebg-preview.png';
import Bedoya from '../../assets/Bedoya-removebg-preview.png';
import Santos from '../../assets/SergioSantos-removebg-preview.png';

const triangleWidth = 50;

function MainContent() {
    const side = 10;
    return (
        <>
            <SoccerParticlesBackground />
            <div className="relative mb-24">
                <Navbar />
                <div className="mt-16 text-6xl text-center text-union-blue">
                    <div className="relative py-8 w-[800px] rounded-xl bg-union-gold mx-auto shadow-xl ">
                        Collection Showcase
                        {/* Bottom Left Triangle */}
                        <div
                            className={`absolute bottom-0 left-0 border-b-[${triangleWidth}px] border-b-solid border-r-transparent border-r-[${triangleWidth}px] border-union-blue`}
                        />
                        {/* Top Right Triangle */}
                        <div
                            className={`absolute top-0 right-0 h-${side} w-${side} border-b-[${triangleWidth}px] border-b-transparent border-r-solid border-r-[${triangleWidth}px] border-union-blue`}
                        />
                    </div>
                    <div className="mt-24 text-lg">
                        <HomeCardsCarousel />
                    </div>
                </div>
                <div className="text-white">
                    <div className="mx-auto w-[1000px] bg-blue-300 p-10 my-48 rounded-3xl">
                        <div className="mb-8 text-xl">
                            My name is Hari and I&apos;ve been collecting cards
                            for the last 3 years. It has been a long process but
                            I have accumulated over 1000 cards. So, I created
                            this website to show off that beautiful collection.
                        </div>
                        <CollectionTyping />
                    </div>
                </div>

                <div className="grid grid-cols-2">
                    <div className="relative flex justify-center ml-6 mb-96">
                        <img
                            className="absolute left-0 ml-10"
                            src={Carranza}
                            alt="Carranza.png"
                        />
                        <img
                            className="absolute right-0 mr-8 top-0 mt-4 scale-x-[-1]"
                            src={Santos}
                            alt="SergioSantos.png"
                        />
                        <img
                            className="absolute w-full"
                            src={Bedoya}
                            alt="Bedoya.png"
                        />
                    </div>
                    <div className=" flex justify-center items-center mb-96 text-union-blue">
                        <div className="h-96 w-96 rounded-xl bg-union-gold text-2xl">
                            <div className="font-bold ml-8 mt-16 w-3/4">
                                Join me on my collecting journey! Check out some
                                of my recent pickups here!
                            </div>
                            <div className="flex justify-center ml-10 mt-20">
                                <Link to="/recent-additions">
                                    <button
                                        className="rounded-md bg-union-blue px-4 py-3 transition duration-300 text-union-gold hover:bg-blue-600 hover:text-white mr-12"
                                        type="button"
                                    >
                                        Collection
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainContent;
