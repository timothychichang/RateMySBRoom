import React from 'react';


const ReviewContainer = (props) => {

    return (
        <div>
            <h4>Review</h4>
            <p>User: {props.review.user}</p>
            <p>Rating: {props.review.rating}</p>
            <p>Comment: {props.review.comment}</p>
        </div>
    )
}

export default ReviewContainer;