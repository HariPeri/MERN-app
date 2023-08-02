import { Link, useLocation } from 'react-router-dom';
import { kebabCase } from 'lodash';

function Navbar() {
    // storing current location path
    const location = useLocation();

    // function that takes in heading
    const isHeadingActive = (heading: string) => {
        const convHeading = kebabCase(heading); // converts heading text to lowercase & adds hyphens in spaces
        const parts = location.pathname.split('/'); // splits the pathname tring wherever a / is detected
        const activeHeading = parts[1]; // accesses the heading portion of the address
        return convHeading === activeHeading; // returns true or false depending on if on that specific heading page
    };

    // styling for different components
    const linkStyles = 'hover:text-red-200 transition duration-300 p-4'; // navbar menu items when hovered

    return (
        // div containing entire navbar (using flex for row view)
        <div className="flex h-24 bg-blue-900 text-white">
            {/* YIW + Logo (allocating 1/3 space for div, centered vertically) */}
            <div className="ml-12 flex gap-3 items-center basis-1/3 text-3xl font-bold">
                {/* inserting uva wise logo inside div */}
                <Link to="/"> My Collection </Link>
            </div>
            {/* Menu options (centered vertically, positioned to right) */}
            <div className="flex items-center basis-2/3 justify-end font-bold">
                {/* List of headers (flex for row view, gap between list items with margin on right) */}
                <ul className="flex gap-16 mr-12">
                    {/* changing hover text color with a transition time of 300ms */}
                    <li className="hover:text-red-200 transition duration-300">
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
                    <li className="hover:text-red-200 transition duration-300">
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
                    <li className="hover:text-red-200 transition duration-300">
                        Wantlist
                    </li>
                    <li className="hover:text-red-200 transition duration-300">
                        Tradelist
                    </li>
                </ul>
                <button
                    className="rounded-md bg-union-gold px-4 py-3 transition duration-300 hover:bg-orange-700 hover:text-white mr-12"
                    type="button"
                >
                    Contact Me!
                </button>
            </div>
        </div>
    );
}

// exporting the navbar
export default Navbar;
