import { FaGithubSquare, FaLinkedinIn } from 'react-icons/fa';

function Footer() {
    return (
        // <div className="md:flex h-56 text-union-blue bg-union-gold">
        //     <div className="basis-1/3 bg-union-gold">
        //         <div className="px-32 py-12 flex flex-col">
        //             <span className="text-5xl mb-4"> #DOOP </span>
        //             <span className="text-2xl ">
        //                 Developed by Hari Periyasamy
        //             </span>
        //         </div>
        //     </div>
        //     <div className="basis-1/3 bg-union-gold">
        //         <div className="px-16 mt-10 gap-4 text-xl flex text-union-blue group">
        //             <div className="w-[250px] h-text-center italic font-bold">
        //                 Join the MLS Facebook Collectors Group to see my mailday
        //                 posts!
        //             </div>
        //             {/* Carat */}
        //             <div className="border-union-blue w-2 h-2 border-t-2 mt-16 border-r-2 transform rotate-45 transition-all duration-500 group-hover:translate-x-3" />
        //             <a
        //                 href="https://www.facebook.com/groups/573102782893279"
        //                 target="blank_"
        //             >
        //                 <div className="bg-union-blue text-union-gold text-center p-6 ml-4 italic mt-8 ">
        //                     MLS COLLECTORS
        //                 </div>
        //             </a>
        //         </div>
        //     </div>
        //     <div className="basis-1/3 bg-union-gold">
        //         <div className="px-32 py-12 gap-4 flex flex-col">
        //             <span className="font-bold text-2xl">
        //                 Check out my projects!
        //             </span>
        //             <span className="font-normal"> Socials </span>
        //             <div className="flex gap-2">
        //                 <a
        //                     href="https://www.linkedin.com/in/hari-peri-625a6a283/"
        //                     target="_blank"
        //                     rel="noreferrer"
        //                 >
        //                     <FaLinkedinIn className="h-6 w-6" />
        //                 </a>
        //                 <a
        //                     href="https://github.com/HariPeri"
        //                     target="_blank"
        //                     rel="noreferrer"
        //                 >
        //                     <FaGithubSquare className="h-6 w-6" />
        //                 </a>
        //             </div>
        //         </div>
        //     </div>
        // </div>

        <div className="md:flex md:h-56 text-union-blue bg-union-gold overflow-hidden">
            <div className="w-full md:w-1/3 bg-union-gold">
                <div className="px-6 md:px-12 py-8 md:py-12 flex flex-col items-center md:items-start">
                    <h2 className="text-center md:text-left text-3xl md:text-5xl mb-2 md:mb-4">
                        #DOOP
                    </h2>
                    <p className="text-center md:text-left text-lg md:text-2xl">
                        Developed by Hari Periyasamy
                    </p>
                </div>
            </div>
            <div className="w-full md:w-1/3 bg-union-gold">
                <div className="text-center text-lg md:flex text-union-blue group">
                    <div className="flex items-center justify-center text-center md:w-1/2 md:h-[200px] md:mt-2 mt-8 italic font-bold">
                        Join the MLS Facebook Collectors Group to see my mailday
                        posts!
                    </div>
                    <div className="mx-auto md:justify-start border-union-blue w-2 h-2 my-6 border-t-2 md:mt-24 md:ml-2 md:mr-10 border-r-2 transform rotate-[135deg] md:rotate-45 transition-all duration-500 group-hover:translate-y-2 md:group-hover:translate-y-0 md:group-hover:translate-x-3" />
                    <a
                        href="https://www.facebook.com/groups/573102782893279"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4" // Added class to control link width
                    >
                        <div className="mx-auto md:w-auto w-[300px] bg-union-blue text-union-gold text-center p-4 md:p-6 italic md:mt-12">
                            MLS COLLECTORS
                        </div>
                    </a>
                </div>
            </div>

            <div className="w-full md:w-1/3 bg-union-gold">
                <div className="px-6 md:px-12 py-8 md:py-12 text-center md:text-left flex flex-col">
                    <h2 className="font-bold text-lg md:text-xl mb-2">
                        Check out my projects!
                    </h2>
                    <p className="text-base md:text-lg font-normal mb-4">
                        Socials
                    </p>
                    <div className="flex justify-center md:justify-start gap-4">
                        <a
                            href="https://www.linkedin.com/in/hari-peri-625a6a283/"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaLinkedinIn className="h-6 w-6" />
                        </a>
                        <a
                            href="https://github.com/HariPeri"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <FaGithubSquare className="h-6 w-6" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer;
