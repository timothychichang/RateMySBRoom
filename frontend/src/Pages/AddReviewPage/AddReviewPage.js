import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../Components/Navbar/Navbar.js';
import './AddReviewPage.css';

const AddReviewPage = () => {

    const navigate = useNavigate();
    const { id } = useParams();
    const [room, setRoom] = useState([]);
    
    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchRoom(); 
        
        // user must already be signed in to access this page
        const userData = window.localStorage.getItem('USER');
        setUser(JSON.parse(userData));
    
    }, []);

    const fetchRoom = async() => {
        try {
            await axios.get(`/api/${id}`).then((res) => {setRoom(res.data)})  
        } catch (err) {
            console.log(err);
        }
    }

    const handleSubmit = async(event) => {
        event.preventDefault();

        const userComment = document.getElementById('userComment');
        const userRating = document.getElementById('userRating');
        
        const userReview = {
            userRating: userRating.value,
            userComment: userComment.value,
            userEmail: user.email
        };
        await axios.put(`/api/addReview/${id}`, userReview).then((response) => {
            console.log(response.status);
        })
        navigate(`/room/${id}`);
    
    }

    return (
        <div>
            <Navbar/>
            <div className='review-background'>
                <h1>Reviewing {room.name}</h1>
            </div>
            <div>
                <form className='review-form' onSubmit={handleSubmit}>
                    <div className='user-review-section'>
                        <div className='rating-section'>
                            <label>Your Rating* : </label>
                            <select 
                                name='userRating'
                                id='userRating'
                            >
                                <option selected="selected" value={1}>1 (Terrible)</option>
                                <option value={2}>2</option>
                                <option value={3}>3</option>
                                <option value={4}>4</option>
                                <option value={5}>5 (Amazing)</option>
                            </select>
                        </div>
                        <div className='comment-section'>
                            <label>Your Comments* : </label>
                            <textarea 
                                name='userComment' 
                                id='userComment' 
                                placeholder='Share your thoughts...'
                            />
                        </div>
                    </div>
                    <button type='submit'>Submit</button>
                </form>
                <p className='fine-print'>* = required</p>
            </div>
        </div>
    )
}

export default AddReviewPage;