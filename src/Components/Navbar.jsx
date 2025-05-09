import React, { useState } from 'react';
import './Navbar.css';
import { images } from '../assets';
import { PiPhone } from 'react-icons/pi';
import { FaAngleDown, FaAngleRight, FaBarsStaggered, } from 'react-icons/fa6';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { BiCart, BiSearch, BiUser } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../assets/firebase'; // adjust the path as needed


const Navbar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { openSignIn } = useClerk();
    const { isSignedIn } = useUser();

    const toggleDropdown = () => setOpen(!open);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const closeSidebar = () => setSidebarOpen(false);

    const renderDropdownMenu = () => (
        <ul className="dropdown-menu">
            <li className="dropdown-sub">
                <span>
                    <Link to="/charcoalgrills">Charcoal Grills <FaAngleRight /></Link>
                </span>
                <ul className="dropdown-menu-right">
                    <li><Link to="/builtincharcoalgrills">Built-in Charcoal Grills</Link></li>
                    <li><Link to="/freestandingcharcoalgrills">Freestanding Charcoal Grills</Link></li>
                    <li><Link to="/kettlegrills">Kettle Grills</Link></li>
                    <li><Link to="/portablecharcoalgrills">Portable Charcoal Grills</Link></li>
                </ul>
            </li>
            <li><Link to="/electricgrills">Electric Grills</Link></li>
        </ul>

    );
    const handleSearch = async (e) => {
        const value = e.target.value.toLowerCase();
        setSearchTerm(value);

        if (value.trim() === '') {
            setSuggestions([]);
            return;
        }

        try {
            const querySnapshot = await getDocs(collection(db, 'products'));
            const allProducts = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            const filteredProducts = allProducts.filter(product =>
                product.name.toLowerCase().includes(value)
            );

            if (filteredProducts.length > 0) {
                setSuggestions(filteredProducts);
            } else {
                setSuggestions([{ id: null, name: 'No product found' }]);
            }
        } catch (error) {
            console.error("Search error:", error);
            setSuggestions([{ id: null, name: 'Error during search' }]);
        }
    };



    const handleSelect = (id) => {
        setSearchTerm('');
        setSuggestions([]);
        if (id) navigate(`/product/${id}`);
    };




    return (
        <div>
            {/* Top Bar */}
            <div className='top-bar'>
                <div className='top-bar-left'>
                    <h6>Free delivery on pellets when you order 5 bags or more, within a 50-mile range!</h6>
                </div>
                <div className='top-bar-right'>
                    <h6>Store Locations</h6>
                    <h6 className='offer'>Free Outdoor Kitchen Design</h6>
                    {/* <h6 className=''>25% OFF MSRP</h6> */}
                </div>
            </div>

            {/* Mid Bar */}
            <div className='mid-bar'>
                <div className='mid-bar-left'>
                    {
                        <Link to="/">
                            <img src={images.logo} alt="Logo" />
                        </Link>
                    }
                </div>

                <div className='mid-bar-mid'>
                    <div className='search'>
                        <input
                            type="text"
                            placeholder='Search BBQ People...'
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                        <BiSearch className='search-icon' />
                        {searchTerm && (
                            <ul className='search-suggestions'>
                                {suggestions.map((item, index) => (
                                    <li
                                        key={index}
                                        onClick={() => item.id && handleSelect(item.id)}
                                        className={!item.id ? 'disabled' : ''}
                                    >
                                        {item.name}
                                    </li>
                                ))}
                            </ul>
                        )}

                    </div>

                </div>

                <div className='mid-bar-right'>
                    <div className="dropdown">
                        <div className="dropdown-header" onClick={toggleDropdown}>
                            <div className="small-heading">Ask an Expert</div>
                            <div className="phone-display">
                                <PiPhone /> <span>(832) 510-1966</span> <FaAngleDown />
                            </div>
                        </div>

                        {open && (
                            <div className="dropdown-menu2">
                                <p><strong>Phone:</strong> <a href="tel:(832) 510-1966">(832) 510-1966</a></p>
                                <p><strong>Email:</strong> <a href="mailto:sales@bbqgrillpeople.com">Email Us</a></p>
                                <div className="section2">
                                    <strong>Sales:</strong><br />
                                    Mon-Fri: 9am - 6pm CST<br />
                                    Sat: 9am - 5pm CST<br />
                                    Sun: Closed CST
                                </div>
                                <div className="section2">
                                    <strong>Support:</strong><br />
                                    Mon-Fri: 9am - 6pm CST<br />
                                    Sat and Sun: Closed
                                </div>
                            </div>
                        )}
                    </div>

                    <div className='sign-up' onClick={openSignIn}>
                        {isSignedIn ? <UserButton afterSignOutUrl="/" /> : <BiUser />}
                    </div>

                    <div className='cart'>
                        {
                            <Link to={'/viewcart'}><BiCart className='cart-icon' /></Link>
                        }
                        <h1>My Cart</h1>
                    </div>

                </div>

            </div>
            {/* Bottom Bar */}

            <div className='bottom-bar'>
                <nav className="navbar">
                    <div className="hamburger" onClick={toggleSidebar}>
                        <FaBarsStaggered size={22} />
                    </div>

                    <ul className="nav-menu">
                        <li className="dropdown">
                            <span><Link to="/grills">Grills <FaAngleDown /></Link></span>
                            {renderDropdownMenu()}
                        </li>
                        <li className="dropdown">
                            <span><Link to="/outdoorkitchen">Outdoor Kitchens <FaAngleDown /></Link></span>
                            {renderDropdownMenu()}
                        </li>
                        <li className="dropdown">
                            <span><Link to="/accessories">Accessories <FaAngleDown /></Link></span>
                            {renderDropdownMenu()}
                        </li>
                        <li className="dropdown">
                            <span><Link to="/fuel">Fuel <FaAngleDown /></Link></span>
                            {renderDropdownMenu()}
                        </li>
                        <li>
                            <Link to="/contact">Contact</Link>
                        </li>
                    </ul>

                    <div className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
                        <div className="hamburger" onClick={toggleSidebar}>
                            <FaTimes size={22} />
                        </div>
                        <ul>
                            <li><Link to="/grills" onClick={closeSidebar}>Grills</Link></li>
                            <li><Link to="/outdoorkitchen" onClick={closeSidebar}>Outdoor Kitchen</Link></li>
                            <li><Link to="/accessories" onClick={closeSidebar}>Accessories</Link></li>
                            <li><Link to="/fuel" onClick={closeSidebar}>Fuel</Link></li>
                            <li><Link to="/contact" onClick={closeSidebar}>Contact</Link></li>
                        </ul>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Navbar;
