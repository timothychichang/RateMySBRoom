import React from 'react';
import { Link } from 'react-router-dom';
import { decodeBuffer } from '../../Javascript/functions.js';
import './RoomContainer.css';

const RoomContainer = (props) => {

    const noImage = () => {
        return (
            <div className='no-img-container'>
                <p>- - NO IMAGE PROVIDED - -</p>
            </div>
        )
    }

    return (
        <div className='container'>
            <div>
                {props.room.image === '' ? 
                    noImage() : <img className='container-img' src={decodeBuffer(props.room.imagePath.data)}/>
                }
            </div>
            <div className='info-container'>
                <Link to={`/room/${props.room.id}`}>{props.room.name}</Link>
                <p>Rating: {props.room.avgRating} / 5</p>
                { props.room.numReviews === 1 ? <p>{props.room.numReviews} Review</p> : 
                                                <p>{props.room.numReviews} Reviews</p> } 
            </div>
        </div>
    )
}


export default RoomContainer;