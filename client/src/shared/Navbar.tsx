import { Link, useLocation } from 'react-router-dom';
import { kebabCase } from 'lodash';
import { useState } from 'react';
import {
    Bars3Icon,
    XMarkIcon,
} from '@heroicons/react/24/solid'; /* imports the Bars3Icon and xMarkIcon from @heroicons module, utilizing the entire path */
import ComingSoon from '../assets/ComingSoonDownloaded-removebg-preview.png';
import useLogout from '../hooks/useLogout';
import useAuthContext from '../hooks/useAuthContext';
import useMediaQuery from '../hooks/useMediaQuery';

function Navbar() {
    // storing current location path
    const location = useLocation();

    const { logout } = useLogout();

    const {
        state: { user },
    } = useAuthContext();

    const [isMenuToggled, setMenuToggled] = useState<boolean>(false);
    const isAboveMediumScreens: boolean = useMediaQuery('(min-width: 1205px)'); // returns a bool val as per the custom hook we created that takes in a media query string
    // in this case that string is the min-width of 1060 so it will return true if the viewport size is greater than 1060px
    // media queries must have paranthesees around them

    // function that takes in heading
    const isHeadingActive = (heading: string) => {
        const convHeading = kebabCase(heading); // converts heading text to lowercase & adds hyphens in spaces
        const parts = location.pathname.split('/'); // splits the pathname tring wherever a / is detected
        let activeHeading = parts[1]; // accesses the heading portion of the address
        if (activeHeading === 'cards') {
            activeHeading = 'collection';
        }
        return convHeading === activeHeading; // returns true or false depending on if on that specific heading page
    };

    // styling for different components
    const linkStyles = 'hover:text-red-200 transition duration-300 p-4'; // navbar menu items when hovered

    const handleClick = () => {
        logout();
    };

    return (
        // div containing entire navbar (using flex for row view)
        <nav className="flex h-24 bg-union-blue text-white border-t-4 border-union-gold">
            {/* YIW + Logo (allocating 1/3 space for div, centered vertically) */}
            <div className="ml-12 flex gap-3 items-center basis-1/5 text-3xl font-bold">
                {/* inserting uva wise logo inside div */}
                <Link to="/"> My Collection </Link>
            </div>

            {isAboveMediumScreens ? (
                <div className="flex items-center basis-4/5 justify-end font-bold">
                    {/* List of headers (flex for row view, gap between list items with margin on right) */}
                    <ul className="flex gap-12 mr-12">
                        {/* changing hover text color with a transition time of 300ms */}
                        <li>
                            <Link
                                className={`${linkStyles} ${
                                    isHeadingActive('Collection')
                                        ? 'text-red-300'
                                        : ''
                                } `}
                                to="/collection"
                            >
                                Collection
                            </Link>
                        </li>
                        <li>
                            <Link
                                className={`${linkStyles} ${
                                    isHeadingActive('Recent Additions')
                                        ? 'text-red-300'
                                        : ''
                                } `}
                                to="/recent-additions"
                            >
                                Recent Additions
                            </Link>
                        </li>
                        <li className="relative mr-8">
                            Wantlist
                            <div className="absolute left-0 -top-6 -rotate-12 h-[100px] w-[100px]  ">
                                <img src={ComingSoon} alt="ComingSoon.png" />
                            </div>
                        </li>
                        <li className="relative mr-8 ">
                            Tradelist
                            <div className="absolute left-0 -top-6 -rotate-12 h-[100px] w-[100px]  ">
                                <img src={ComingSoon} alt="ComingSoon.png" />
                            </div>
                        </li>
                    </ul>
                    <div className="flex gap-2">
                        <button
                            className="rounded-md bg-union-gold px-4 py-3 my-7 transition duration-300 hover:bg-orange-700 hover:text-white mr-8"
                            type="button"
                        >
                            <Link to="/contact-me">Contact Me!</Link>
                        </button>
                        {!user && (
                            <div className="mr-4 mt-4">
                                <Link to="/login">
                                    <div>Login</div>
                                </Link>
                                ------
                                <Link to="/signup">
                                    <div>Sign up</div>
                                </Link>
                            </div>
                        )}
                        {user && (
                            <div className="w-[150px] flex flex-col mt-4 mr-6 text-md">
                                <div className="text-xs text-center">
                                    {user.email}
                                </div>
                                <div> ---------------- </div>
                                <button type="button" onClick={handleClick}>
                                    Log Out
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                !isMenuToggled && (
                    // if min-width is less than 1060 then utilize this below (primarily for mobile devices)
                    <button
                        className="absolute top-5 right-6 rounded-full  p-2" // Rounded full makes it fully circular. padding of 2 all around
                        onClick={() => setMenuToggled(!isMenuToggled)} // When we click the icon, the menu will close or open depending on its previous state
                        type="button"
                    >
                        <Bars3Icon className="h-12 w-12 text-blue-dark">
                            {' '}
                        </Bars3Icon>
                        {/* For an icon, you call it like this */}
                    </button>
                )
            )}

            {/* Mobile Menu */}
            {!isAboveMediumScreens && isMenuToggled && (
                <div className="fixed bottom-0 right-0 z-40 h-screen w-[300px] bg-union-blue drop-shadow-xl">
                    {/* Exact Pixels in tailwind must be surrounded by [] */}
                    <div className="flex justify-end p-6">
                        <button
                            onClick={() => setMenuToggled(!isMenuToggled)}
                            type="button"
                        >
                            <XMarkIcon className="h-12 w-12 text-white" />{' '}
                            {/* XMarkIcon printed with button functionality */}
                        </button>
                    </div>

                    {/* Menu Items */}

                    <div className="ml-[15%] flex flex-col gap-8 text-xl text-white">
                        {/* Div for innerleft side of the right side of the div that will hold the links */}
                        {/* text will appear smaller than default font sizes and gap of 8 seperates each child element */}

                        {!user && (
                            <div className=" flex gap-4 mr-4 mt-4">
                                <Link
                                    className=" group text-white transition-all duration-300 ease-in-out"
                                    to="/login"
                                >
                                    <span className="bg-left-bottom bg-gradient-to-r from-white to-white bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                                        Login
                                    </span>
                                </Link>
                                <span className="text-white"> / </span>
                                <Link
                                    className=" group text-white transition-all duration-300 ease-in-out"
                                    to="/signup"
                                >
                                    <span className="bg-left-bottom bg-gradient-to-r from-white to-white bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                                        Signup
                                    </span>
                                </Link>
                            </div>
                        )}
                        {user && (
                            <div className="w-[150px] flex flex-col mt-4 mr-6 text-md">
                                <div className="text-xs">
                                    Logged in as {user.email}
                                </div>
                            </div>
                        )}

                        <Link
                            className={`${
                                isHeadingActive('Collection')
                                    ? ' text-union-gold'
                                    : ''
                            } hover:text-red-300 transition duration-300`}
                            to="/collection"
                        >
                            Collection
                        </Link>

                        <Link
                            className={`${
                                isHeadingActive('Recent Additions')
                                    ? ' text-union-gold'
                                    : ''
                            } hover:text-red-300 transition duration-300`}
                            to="/recent-additions"
                        >
                            Recent Additions
                        </Link>

                        {user && (
                            <button
                                className="text-center text-sm w-1/2 group text-white transition-all duration-300 ease-in-out"
                                type="button"
                                onClick={handleClick}
                            >
                                <span className="bg-left-bottom bg-gradient-to-r from-white to-white bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out">
                                    Logout
                                </span>
                            </button>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}

// exporting the navbar
export default Navbar;
