import React from 'react';
import axios from 'axios';
import './ReviewContainer.css';

const ReviewContainer = (props) => {

    const deleteReview = async(review) => {
        try {
            await axios.put(`http://localhost:5000/delReview/${props.id}`, review).then((response) => {
                console.log(response.status);
            })
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }    

    function renderDeleteButton() {
        if (props.user === null || props.user.email !== props.review.user) {
            return null;
        }
        else {
            return (
                <button className='delete-button' onClick={()=>deleteReview(props.review)}> delete </button>
            )
        }
    }

    return (
        <div className='review-container'>
            <div className='review-container-text'>
                <h1>{props.review.user}</h1>
                <p className='review-rating'>Rating: {props.review.rating}</p>
                <p className='review-date'>{props.review.postDate}</p>
                <p className='review-comment'>{props.review.comment}</p>
            </div>
            <div>
                {renderDeleteButton()}
            </div>
        </div>
    )
}

export default ReviewContainer;