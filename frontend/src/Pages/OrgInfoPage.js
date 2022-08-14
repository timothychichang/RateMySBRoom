import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { decodeBuffer } from '../Javascript/functions.js';

const OrgInfoPage = () => {
    
    // unique path for org
    const { id } = useParams();

    const [org, setOrg] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [rating, setRating] = useState(null);

    const [user, setUser] = useState(null);

    useEffect(() => {
        fetchOrg();

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
    

    const fetchOrg = async() => {
        try {
            await axios.get(`http://localhost:5000/${id}`)
                        .then((res) => { 
                            setOrg(res.data); 
                            setIsLoading(false);})  
        } catch (err) {
            console.log(err);
        }
    }


    function renderComments() {
        if (org.comments.length === 0) {
            return (
                <p>No Comments</p>
            )
        }
        else {
            return (
                <div key={org._id}>
                    <p>User Comments: </p>
                    {org.comments.map(comment => 
                        <div>
                            "{comment.comment}" : {comment.user}
                            <button onClick={() => deleteComment(comment)}> x </button>
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
                <h1>{org.name}</h1>
                <p>Description: {org.description}</p>
                <p>Rating: {org.ratings.length !== 0 ? org.avgRating : '-'}/5</p>
                <div>
                    {addNewRating()}
                </div>
                <div>
                    {org.image === '' ? "- - NO IMAGE PROVIDED - -" : <img height='200' src={decodeBuffer(org.imagePath.data)}/>}
                </div>
                <div>
                    {addNewComment()}
                </div>
                <div>
                    {renderComments()}
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

export default OrgInfoPage;