import React from 'react';
import { Link } from 'react-router-dom';
import { decodeBuffer } from '../Javascript/functions.js';

const RoomContainer = (props) => {

    return (
        <div>
            <h3>{props.room.name}</h3>
            <p>Rating: {props.room.avgRating}/5</p>
            <p>Reviews: {props.room.numReviews}</p>
            <div>
                {props.room.image === '' ? 
                    "- - NO IMAGE PROVIDED - -" : <img height='200' src={decodeBuffer(props.room.imagePath.data)}/>}
            </div>
            <Link to={`/${props.room.id}`}>Details</Link>
        </div>
    )
}


export default RoomContainer;