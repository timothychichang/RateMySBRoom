import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const HomePage = () => {

    const [orgs, setOrgs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        fetchOrgs();
    }, []);

    const fetchOrgs = async() => {
        try {
            await axios.get('http://localhost:5000')
                        .then((res) => { 
                            setOrgs(res.data);
                            setIsLoading(false);                
                        })  
        } catch (err) {
            console.log(err);
        }
    }


    function decodeBuffer(buffer) {
        var base64String = btoa(
            new Uint8Array(buffer)
              .reduce((data, byte) => data + String.fromCharCode(byte), '')
        );

        return 'data:image/jpeg;base64,' + base64String;
    }

    function renderList() {
        return (
            <div>
                {orgs.map(org => (
                    <div key={org._id}>
                        <h3>{org.name}</h3>
                        <p>Rating: {org.ratings.length > 0 ? org.avgRating : '-'}/5</p>
                        <p>{org.description}</p>
                        <div>
                            {org.image === '' ? "- - NO IMAGE PROVIDED - -" : <img height='200' src={decodeBuffer(org.imagePath.data)}/>}
                        </div>
                        <Link to={`/${org._id}`}>More Details</Link>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <div>
            <h1>HOME PAGE</h1>
            <Link to='/add'>Add Organization</Link> 
            <div>
                {isLoading === true ? 'loading...' : renderList()}
            </div>
        </div> 
    )
}

export default HomePage;