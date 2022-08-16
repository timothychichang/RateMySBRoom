import React, { useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { Link } from 'react-router-dom';
import './Navbar.css';


const Navbar = () => {

    useEffect(() => {
        /* global google */ 
        loginGoogle();
        
    }, []);

    function loginGoogle() {
        // sign in user or restore user data from localStorage
        const userData = window.localStorage.getItem('USER');
        if (userData === null) {
            google.accounts.id.initialize({
                client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
                callback: handleCallbackResponse
            });
            google.accounts.id.renderButton(
                document.getElementById('signInDiv'),
                { width: '200', size: 'medium' }
            );
        }
        else {
            console.log("already signed in");
        }
    }

    function handleCallbackResponse(response) {
        const userObject = jwtDecode(response.credential);
        window.localStorage.setItem('USER', JSON.stringify(userObject));
        window.location.reload();   
    }

    function signOut() {
        window.localStorage.removeItem('USER');
        window.location.reload();
    }
    

    return (
        <nav className='nav'>
            <Link to='/' className='site-title'>RateMySBRoom</Link>
            <div className='nav-menu'>
                <ul>
                    <li>
                        <Link to='/addRoom'>Add Room</Link>
                    </li>
                    <li>
                        <Link to='/'>Sign In</Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar;