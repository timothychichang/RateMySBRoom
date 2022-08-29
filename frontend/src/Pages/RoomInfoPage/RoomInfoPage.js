import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { decodeBuffer } from '../../Javascript/functions.js';
import ReviewContainer from '../../Components/ReviewContainer/ReviewContainer.js';
import Navbar from '../../Components/Navbar/Navbar.js';
import Popup from '../../Components/Popup/Popup.js';
import './RoomInfoPage.css';

const RoomInfoPage = () => {
    
    // unique path for org
    const { id } = useParams();
    const navigate = useNavigate();

    const [room, setRoom] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showPopup, setShowPopup] = useState(false);
    const [msg, setMsg] = useState('');
    const [userReviewed, setUserReviewed] = useState(false);

    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchRoom();
        fetchUser();

    }, []);

    
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

    function fetchUser() {
        const userData = window.localStorage.getItem('USER');
        if (userData !== null) {
            setUser(JSON.parse(userData));
        }
    }

    function handleWriteReview() {
        if (user === null) {
            setMsg('Sign in to share your thoughts!');
            setShowPopup(true);
        }
        else if (userReviewed === true) {
            setMsg(`You've already left a review!`);
            setShowPopup(true);
        }
        else {
            navigate(`/addReview/${id}`);
        }
    }

    function displayReviews() {
        return (
            <div className='reviews-container'>
                    {room.reviews.map(review => (
                        <ReviewContainer setUserReviewed={setUserReviewed} 
                                        review={review} 
                                        currUser={user} 
                                        id={id} />
                    ))}
            </div>
        )
    }

    

    function renderPage() {
        return (
            <div>
                <div className="room-img-container">
                    {room.image === '' ? "- - NO IMAGE PROVIDED - -" : <img src={decodeBuffer(room.imagePath.data)}/>}
                </div>
                <div className='room-info-container'>
                    <div className='room-info'>
                        <h1>{room.name}</h1>
                        <p>Rating: {room.reviews.length !== 0 ? room.avgRating : '-'} / 5</p>
                        <p>Reviews: {room.numReviews}</p>
                    </div>
                    <div className='room-info-button-container'>
                        <button onClick={()=>handleWriteReview()}>Write a Review</button>
                    </div>
                </div>
                <div>
                    {room.numReviews === 0 ? <p className='no-reviews'>- - No reviews yet - -</p> : displayReviews()}
                </div>
            </div>
        )
    }


    return (
        <div>
            <Navbar/>
            {isLoading === true ? <p className='loading'>loading...</p> : renderPage()}
            {showPopup === true ? <Popup setShowPopup={setShowPopup} msg={msg} /> : null}         
        </div>
    )
}

export default RoomInfoPage;