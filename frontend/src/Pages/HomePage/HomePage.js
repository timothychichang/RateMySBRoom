import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { decodeBuffer } from '../../Javascript/functions.js';


const HomePage = () => {

    const [orgs, setOrgs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchOrgs();

        /* global google */ 
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
            
    }, []);

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

    
    const fetchOrgs = async() => {
        try {
            await axios.get('http://localhost:5000')
                        .then((res) => { 
                            setOrgs(res.data);
                            setIsLoading(false);                
                        })  
        } catch (err) {
            console.log(err);
        }
    }


    function renderList() {
        return (
            <div>
                <div>
                    {orgs.map(org => (
                        <div key={org._id}>
                            <h3>{org.name}</h3>
                            <p>Rating: {org.ratings.length > 0 ? org.avgRating : '-'}/5</p>
                            <p>{org.description}</p>
                            <div>
                                {org.image === '' ? 
                                    "- - NO IMAGE PROVIDED - -" : <img height='200' src={decodeBuffer(org.imagePath.data)}/>}
                            </div>
                            <Link to={`/${org._id}`}>More Details</Link>
                        </div>
                    ))}
                </div>
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