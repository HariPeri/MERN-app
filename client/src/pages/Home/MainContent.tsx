import { Link } from 'react-router-dom';
import HomeCardsCarousel from './HomeCardsCarousel';
import Navbar from '../../shared/Navbar';
import CollectionTyping from './CollectionTyping';
// import SoccerParticlesBackground from './SoccerParticlesBackground';
import HomeGraphic from '../../assets/HomeGraphic.png';
import Footer from '../../shared/Footer';
import Divider from '../../shared/Divider';

function MainContent() {
    return (
        <>
            {/* <SoccerParticlesBackground /> */}
            <div className="relative mb-24">
                <Navbar />
                <div className="mt-16 text-6xl text-center text-union-blue">
                    <div className="relative py-8 w-[800px] rounded-xl bg-union-gold mx-auto shadow-xl ">
                        Collection Showcase
                        {/* Bottom Left Triangle */}
                        <div className="absolute bottom-0 left-0 border-b-[60px] border-b-solid border-r-transparent border-r-[60px] border-union-blue" />
                        {/* Top Right Triangle */}
                        <div className="absolute top-0 right-0 border-b-[60px] border-b-transparent border-r-solid border-r-[60px] border-union-blue" />
                    </div>
                    <div className="mt-24 mb-48">
                        <HomeCardsCarousel />
                    </div>
                </div>
                <div className="text-white">
                    <div className="mx-auto w-[1000px] bg-union-blue p-10 my-36 rounded-3xl border-4 border-white shadow-lg shadow-white">
                        <div className="mb-8 text-xl">
                            My name is Hari and I&apos;ve been collecting cards
                            for the last 3 years. It has been a long process but
                            I have accumulated over 1000 cards. So, I created
                            this website to show off that beautiful collection.
                        </div>
                        <CollectionTyping />
                    </div>
                </div>

                <Divider />

                <div className="md:grid grid-cols-2 mt-24 ">
                    <div className="relative flex justify-center ml-6 mb-64 bg-union-blue rounded-full">
                        <img
                            src={HomeGraphic}
                            alt="HomeGraphic.png"
                            width="700"
                        />
                    </div>
                    <div className=" flex justify-center items-center mb-64 text-union-blue">
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
                <Footer />
            </div>
        </>
    );
}

export default MainContent;
