import React, { useEffect, useState } from 'react';
import Navbar from '../../Components/Navbar/Navbar.js';
import jwtDecode from 'jwt-decode';
import Footer from '../../Components/Footer/Footer.js';
import './SignInPage.css';
import wallpaper from '../../Images/UCSBPhoto.jpeg';


const SignInPage = () => {

    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        /* global google */ 
        loginGoogle();
        console.log(process.env.REACT_APP_GOOGLE_CLIENT_ID);
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
            setIsSignedIn(true);
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
        <div>
            <Navbar/>
            <div style={{ backgroundImage:`url(${wallpaper})`,
                    backgroundRepeat:'no-repeat',backgroundSize:'cover', 
                    backgroundPosition:'bottom', height:'470px', width:'100vw' }}>
            </div>
            <h1>{isSignedIn === false ? 'Sign In To Add Your Review':'Start Writing Reviews!'}</h1>
            <div className='signInContainer'>
                {isSignedIn === false ? <div id='signInDiv'></div> : 
                    <button onClick={()=>signOut()} className='signOut'>Sign Out</button>}
            </div>
            <Footer/>
        </div>
    )
}

export default SignInPage;