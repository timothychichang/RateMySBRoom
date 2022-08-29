import React from 'react';
import './Popup.css';

const Popup = ({ setShowPopup, msg }) => {

    return (
        <div className='popup'>
            <div className='popup-inner'>
                <h1>{msg}</h1>
                <button className='close-btn' onClick={()=>setShowPopup(false)}>close</button>
            </div>
        </div>
    )
}

export default Popup;