import React from 'react';
import axios from 'axios';


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
                <button onClick={()=>deleteReview(props.review)}>x</button>
            )
        }
    }

    return (
        <div>
            <h4>Review</h4>
            <p>User: {props.review.user}</p>
            <p>Rating: {props.review.rating}</p>
            <p>Comment: {props.review.comment}</p>
            <div>
                {renderDeleteButton()}
            </div>
        </div>
    )
}

export default ReviewContainer;