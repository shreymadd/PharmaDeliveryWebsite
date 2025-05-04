import React, { useContext, useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const location = useLocation();

    const {
        setShowSearch,
        getCartCount,
        navigate,
        token,
        setToken,
        setCartItems,
        products
    } = useContext(ShopContext);

    // Update cart count whenever it changes
    useEffect(() => {
        setCartCount(getCartCount());
    }, [getCartCount]);

    const logout = () => {
        navigate('/login');
        localStorage.removeItem('token');
        setToken('');
        setCartItems({});
        setVisible(false);
    };

    // Close sidebar when route changes
    useEffect(() => {
        setVisible(false);
    }, [location]);

    return (
        <div className='flex items-center justify-between py-5 font-medium'>
            <Link to='/'><img src={assets.logo} className='w-36' alt="PharmaDelivery Logo" /></Link>

            <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
                <NavLink to='/' className={({ isActive }) => 
                    `flex flex-col items-center gap-1 ${isActive ? 'text-black' : ''}`
                }>
                    <p>HOME</p>
                    <hr className={`w-2/4 border-none h-[1.5px] bg-gray-700 ${location.pathname === '/' ? 'block' : 'hidden'}`} />
                </NavLink>
                <NavLink to='/collection' className={({ isActive }) => 
                    `flex flex-col items-center gap-1 ${isActive ? 'text-black' : ''}`
                }>
                    <p>COLLECTION</p>
                    <hr className={`w-2/4 border-none h-[1.5px] bg-gray-700 ${location.pathname === '/collection' ? 'block' : 'hidden'}`} />
                </NavLink>
                <NavLink to='/about' className={({ isActive }) => 
                    `flex flex-col items-center gap-1 ${isActive ? 'text-black' : ''}`
                }>
                    <p>ABOUT</p>
                    <hr className={`w-2/4 border-none h-[1.5px] bg-gray-700 ${location.pathname === '/about' ? 'block' : 'hidden'}`} />
                </NavLink>
                <NavLink to='/contact' className={({ isActive }) => 
                    `flex flex-col items-center gap-1 ${isActive ? 'text-black' : ''}`
                }>
                    <p>CONTACT</p>
                    <hr className={`w-2/4 border-none h-[1.5px] bg-gray-700 ${location.pathname === '/contact' ? 'block' : 'hidden'}`} />
                </NavLink>
            </ul>

            <div className='flex items-center gap-6'>
                <img 
                    onClick={() => { 
                        setShowSearch(true); 
                        navigate('/collection');
                        setVisible(false);
                    }} 
                    src={assets.search_icon} 
                    className='w-5 cursor-pointer hover:opacity-80 transition-opacity' 
                    alt="Search" 
                />
                
                <div className='group relative'>
                    <img 
                        onClick={() => token ? null : navigate('/login')} 
                        className='w-5 cursor-pointer hover:opacity-80 transition-opacity' 
                        src={assets.profile_icon} 
                        alt="Profile" 
                    />
                    {/* Dropdown Menu */}
                    {token && 
                    <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4 z-50'>
                        <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-white shadow-lg rounded-lg border border-gray-100'>
                            <p className='cursor-pointer hover:text-black transition-colors'>My Profile</p>
                            <p onClick={() => navigate('/orders')} className='cursor-pointer hover:text-black transition-colors'>Orders</p>
                            <p onClick={logout} className='cursor-pointer hover:text-black transition-colors'>Logout</p>
                        </div>
                    </div>}
                </div> 

                <Link to='/cart' className='relative group'>
                    <img src={assets.cart_icon} className='w-5 min-w-5 group-hover:opacity-80 transition-opacity' alt="Cart" />
                    {cartCount > 0 && (
                        <p className='absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white aspect-square rounded-full text-[8px]'>
                            {cartCount}
                        </p>
                    )}
                </Link> 

                <img 
                    onClick={() => setVisible(true)} 
                    src={assets.menu_icon} 
                    className='w-5 cursor-pointer sm:hidden hover:opacity-80 transition-opacity' 
                    alt="Menu" 
                /> 
            </div>

            {/* Sidebar menu for small screens */}
            <div className={`fixed top-0 right-0 bottom-0 overflow-hidden bg-white transition-all duration-300 ease-in-out z-50 ${visible ? 'w-full' : 'w-0'}`}>
                <div className='flex flex-col text-gray-600 h-full'>
                    <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer hover:bg-gray-50'>
                        <img className='h-4 rotate-180' src={assets.dropdown_icon} alt="Close" />
                        <p>Back</p>
                    </div>
                    <NavLink 
                        onClick={() => setVisible(false)} 
                        className={({ isActive }) => 
                            `py-2 pl-6 border ${isActive ? 'bg-gray-50 text-black' : ''}`
                        } 
                        to='/'
                    >
                        HOME
                    </NavLink>
                    <NavLink 
                        onClick={() => setVisible(false)} 
                        className={({ isActive }) => 
                            `py-2 pl-6 border ${isActive ? 'bg-gray-50 text-black' : ''}`
                        } 
                        to='/collection'
                    >
                        COLLECTION
                    </NavLink>
                    <NavLink 
                        onClick={() => setVisible(false)} 
                        className={({ isActive }) => 
                            `py-2 pl-6 border ${isActive ? 'bg-gray-50 text-black' : ''}`
                        } 
                        to='/about'
                    >
                        ABOUT
                    </NavLink>
                    <NavLink 
                        onClick={() => setVisible(false)} 
                        className={({ isActive }) => 
                            `py-2 pl-6 border ${isActive ? 'bg-gray-50 text-black' : ''}`
                        } 
                        to='/contact'
                    >
                        CONTACT
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
