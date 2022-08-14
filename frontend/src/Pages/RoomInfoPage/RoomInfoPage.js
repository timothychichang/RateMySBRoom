import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { decodeBuffer } from '../../Javascript/functions.js';

const RoomInfoPage = () => {
    
    // unique path for org
    const { id } = useParams();

    const [room, setRoom] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [rating, setRating] = useState(null);

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




    const handleSubmit = async(event) => {
        event.preventDefault();

        const userComment = document.getElementById('newComment');
        const commentJSON = {
            comment: userComment.value,
            userEmail: user.email
        }
        await axios.put(`http://localhost:5000/${id}/addComment`, commentJSON).then((response) => {
            console.log(response.status);
        })
        window.location.reload();
    } 

    

    const handleNewRating = async(event) => {
        event.preventDefault();
        
        const userRating = {
            rating: rating,
            userEmail: user.email
        }
        await axios.put(`http://localhost:5000/${id}/addRating`, userRating).then((response) => {
            console.log(response.status);
        })
        window.location.reload();
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
                <Link to={`/addReview/${id}`}>Write a Review</Link>
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