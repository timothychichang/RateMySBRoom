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


    function renderComments() {
        if (room.comments.length === 0) {
            return (
                <p>No Comments</p>
            )
        }
        else {
            return (
                <div key={room._id}>
                    <p>User Comments: </p>
                    {room.comments.map(comment => 
                        <div>
                            "{comment.comment}" : {comment.user}
                            <div>
                                {(user !== null && comment.user === user.email) ? 
                                    <button onClick={() => deleteComment(comment)}> x </button> : null}
                            </div>
                        </div>)}
                </div>
            )
        }
    }

    function addNewComment() {
        return (
            <div>
                <form onSubmit={handleSubmit}>
                    <div>
                        <textarea 
                            name='newComment' 
                            id='newComment' 
                            placeholder='enter a comment'
                        />
                    </div>
                    <button type='submit'>Post</button>
                </form>
            </div>
        )
    }

    const deleteComment = async(userComment) => {
        if (user.email === userComment.user) {
            await axios.put(`http://localhost:5000/${id}/delComment`, userComment).then((response) => {
                console.log(response.status);
            })
            window.location.reload();
        }
        else {
            console.log('invalid delete request')
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

    function addNewRating() {
        return (
            <div>
                <label>Add Your Rating</label>
                <form onSubmit={handleNewRating}>
                    <select 
                        name='rating'
                        onChange={(e) => setRating(e.target.value)}
                    >
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                    </select>
                    <button type='submit'>Add</button>
                </form>
            </div>
        )
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
                <div>
                    {/*addNewRating()*/}
                </div>
                <div>
                    {room.image === '' ? "- - NO IMAGE PROVIDED - -" : <img height='200' src={decodeBuffer(room.imagePath.data)}/>}
                </div>
                <div>
                    {/*addNewComment()*/}
                </div>
                <div>
                    {/*renderComments()*/}
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
            {isLoading === true ? "loading..." : renderPage()}            
        </div>
    )
}

export default RoomInfoPage;