import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RoomContainer from '../../Components/RoomContainer/RoomContainer.js';
import Navbar from '../../Components/Navbar/Navbar.js';
import wallpaper from '../../Images/UCSBPhoto.jpeg';
import Footer from '../../Components/Footer/Footer.js';
import './HomePage.css';


const HomePage = () => {

    const [rooms, setRooms] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchRooms();
        
    }, []);
    
    const fetchRooms = async() => {
        try {
            await axios.get('http://localhost:8800/api')
                        .then((res) => { 
                            setRooms(res.data);
                            setIsLoading(false);                
                        })  
        } catch (err) {
            console.log(err);
        }
    }


    function renderList() {
        console.log(rooms);
        return (
            <div className='room-container'>
                {rooms.map(room => (
                    <RoomContainer key={room._id} room={room} />
                ))}
                <Footer/>
            </div>
        )
    }

    return (
        <div>
            <Navbar/>
            <div style={{ backgroundImage:`url(${wallpaper})`,
                    backgroundRepeat:'no-repeat',backgroundSize:'cover', 
                    backgroundPosition:'bottom', height:'470px', width:'100vw' }}>
                <p className='home-title'>Home Page</p>
            </div>
            <div className='list-title'>
                <h1>All Results</h1>
            </div>
            <div>
                {isLoading === true ? <p className='loading'>loading...</p> : renderList()}
            </div>
        </div> 
    )
}

export default HomePage;