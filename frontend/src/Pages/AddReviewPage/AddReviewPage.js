import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';


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
            await axios.get(`http://localhost:5000/${id}`).then((res) => {setRoom(res.data)})  
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
        await axios.put(`http://localhost:5000/addReview/${id}`, userReview).then((response) => {
            console.log(response.status);
        })
        navigate(`/room/${id}`);
    
    }

    return (
        <div>
            <Link to={`/room/${id}`}>Back</Link>
            <div>
                <h1>Write a Review</h1>
                <h3>Apartment/Dorm: {room.name}</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Your Rating: </label>
                        <select 
                            name='userRating'
                            id='userRating'
                        >
                            <option selected="selected" value={1}>1</option>
                            <option value={2}>2</option>
                            <option value={3}>3</option>
                            <option value={4}>4</option>
                            <option value={5}>5</option>
                        </select>
                    </div>
                    <div>
                        <label>Your Comments: </label>
                        <textarea 
                            name='userComment' 
                            id='userComment' 
                            placeholder='enter your comments...'
                        />
                    </div>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default AddReviewPage;