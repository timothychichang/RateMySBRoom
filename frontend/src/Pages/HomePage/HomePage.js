import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import RoomContainer from '../../Components/RoomContainer.js';


const HomePage = () => {

    const [rooms, setRooms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchRooms();

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
                { theme: 'outline', size: 'large' }
            );
        }
        else {
            setUser(JSON.parse(userData));
            console.log("already signed in");
        }
    }

    function handleCallbackResponse(response) {
        //console.log("Encoded token: " + response.credential);
        const userObject = jwtDecode(response.credential);
        setUser(userObject);
        window.localStorage.setItem('USER', JSON.stringify(userObject));
        window.location.reload();   
    }

    function handleSignOut() {
        window.localStorage.removeItem('USER');
        setUser(null);
        window.location.reload();
    }

    
    const fetchRooms = async() => {
        try {
            await axios.get('http://localhost:5000')
                        .then((res) => { 
                            setRooms(res.data);
                            setIsLoading(false);                
                        })  
        } catch (err) {
            console.log(err);
        }
    }


    function renderList() {
        return (
            <div>
                {rooms.map(room => (
                    <RoomContainer room={room} />
                ))}
            </div>
        )
    }

    return (
        <div>
            <div id="signInDiv"></div>
            <div>
                {user === null ? null : <button onClick={()=>handleSignOut()}>Sign Out</button>}
            </div>
            <h1>HOME PAGE</h1>
            <Link to='/add'>Add Apartment</Link> 
            <div>
                {isLoading === true ? 'loading...' : renderList()}
            </div>
        </div> 
    )
}

export default HomePage;