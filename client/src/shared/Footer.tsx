import { FaGithubSquare, FaLinkedinIn } from 'react-icons/fa';

function Footer() {
    return (
        <div className="md:flex h-56 text-union-blue bg-union-gold">
            <div className="basis-1/3 bg-union-gold">
                <div className="px-32 py-12 flex flex-col">
                    <span className="text-5xl mb-4"> #DOOP </span>
                    <span className="text-2xl ">
                        Developed by Hari Periyasamy
                    </span>
                </div>
            </div>
            <div className="basis-1/3 bg-union-gold">
                <div className="px-16 mt-10 gap-4 text-xl flex text-union-blue group">
                    <div className="w-1/3 text-center italic font-bold">
                        Join the MLS Facebook Collectors Group to see my mailday
                        posts!
                    </div>
                    {/* Carat */}
                    <div className="border-union-blue w-2 h-2 border-t-2 mt-16 border-r-2 transform rotate-45 transition-all duration-500 group-hover:translate-x-3" />
                    <a
                        href="https://www.facebook.com/groups/573102782893279"
                        target="blank_"
                    >
                        <div className="bg-union-blue text-union-gold text-center p-6 ml-4 italic mt-8 ">
                            MLS COLLECTORS
                        </div>
                    </a>
                </div>
            </div>
            <div className="basis-1/3 bg-union-gold">
                <div className="px-32 py-12 gap-4 flex flex-col">
                    <span className="font-bold text-2xl">
                        Check out my projects!
                    </span>
                    <span className="font-normal"> Socials </span>
                    <div className="flex gap-2">
                        <a
                            href="https://www.linkedin.com/in/hari-peri-625a6a283/"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <FaLinkedinIn className="h-6 w-6" />
                        </a>
                        <a
                            href="https://github.com/HariPeri"
                            target="_blank"
                            rel="noreferrer"
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
