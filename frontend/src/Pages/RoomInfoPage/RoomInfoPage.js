import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { decodeBuffer } from '../../Javascript/functions.js';
import ReviewContainer from '../../Components/ReviewContainer/ReviewContainer.js';

const RoomInfoPage = () => {
    
    // unique path for org
    const { id } = useParams();
    const navigate = useNavigate();

    const [room, setRoom] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchRoom();

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
    

    const fetchRoom = async() => {
        try {
            await axios.get(`http://localhost:5000/${id}`)
                        .then((res) => { 
                            setRoom(res.data); 
                            setIsLoading(false);})  
        } catch (err) {
            console.log(err);
        }
    }

    function handleWriteReview() {
        if (user !== null) {
            navigate(`/addReview/${id}`);
        }
        else {
            console.log('Must be signed in to write review');
        }
    }


    function renderPage() {
        return (
            <div>
                <Link to='/'>Back</Link>
                <h1>{room.name}</h1>
                <p>Rating: {room.reviews.length !== 0 ? room.avgRating : '-'}/5</p>
                <p>Reviews: {room.numReviews}</p>
                <div>
                    {room.image === '' ? "- - NO IMAGE PROVIDED - -" : <img height='200' src={decodeBuffer(room.imagePath.data)}/>}
                </div>
                <button onClick={()=>handleWriteReview()}>Write a Review</button>
                {room.reviews.map(review => (
                    <ReviewContainer review={review} user={user.email} id={id} />
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
            {isLoading === true ? "loading..." : renderPage()}            
        </div>
    )
}

export default RoomInfoPage;