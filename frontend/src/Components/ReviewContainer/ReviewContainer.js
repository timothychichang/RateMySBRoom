import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import './ReviewContainer.css';

const ReviewContainer = ({ setUserReviewed, review, currUser, id }) => {

    useEffect(() => {
        checkUserReviewed();

    }, []);

    function checkUserReviewed() {
        if (currUser.email === review.user) {
            setUserReviewed(true);
        }
    }

    const deleteReview = async(review) => {
        try {
            await axios.put(`http://localhost:8800/delReview/${id}`, review).then((response) => {
                console.log(response.status);
            })
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }    

    function renderDeleteButton() {
        if (currUser === null || currUser.email !== review.user) {
            return null;
        }
        else {
            return (
                <button className='delete-button' onClick={()=>deleteReview(review)}> delete </button>
            )
        }
    }

    return (
        <div className='review-container'>
            <div className='review-container-text'>
                <h1>{review.user}</h1>
                <p className='review-rating'>Rating: {review.rating}</p>
                <p className='review-date'>{review.postDate}</p>
                <p className='review-comment'>{review.comment}</p>
            </div>
            <div>
                {renderDeleteButton()}
            </div>
        </div>
    )
}

export default ReviewContainer;