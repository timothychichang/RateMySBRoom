import React from 'react';
import './Popup.css';

const Popup = ({setShowPopup}) => {

    return (
        <div className='popup'>
            <div className='popup-inner'>
                <h1>Sign In To Share Your Thoughts!</h1>
                <button className='close-btn' onClick={()=>setShowPopup(false)}>close</button>
            </div>
        </div>
    )
}

export default Popup;