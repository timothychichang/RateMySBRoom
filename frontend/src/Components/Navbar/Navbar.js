import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';


const Navbar = () => {

    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        const userData = window.localStorage.getItem('USER');
        if (userData !== null) { 
            setIsSignedIn(true);
        }
    }, []);
    
    return (
        <nav className='nav'>
            <Link to='/' className='site-title'>RateMySBRoom</Link>
            <div className='nav-menu'>
                <ul>
                    <li>
                        <Link to='/addRoom'>Add Room</Link>
                    </li>
                    <li>
                        <Link to='/signin'>{isSignedIn === false ? 'Sign In' : 'Sign Out'}</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;