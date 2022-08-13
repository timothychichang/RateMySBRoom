import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';


const OrgInfoPage = () => {
    
    // unique path for org
    const { id } = useParams();

    const [org, setOrg] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        fetchOrg();
    }, []);
    
    const fetchOrg = async() => {
        try {
            await axios.get(`http://localhost:5000/${id}`)
                        .then((res) => { 
                            setOrg(res.data); 
                            setIsLoading(false);})  
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


    function renderPage() {
        return (
            <div>
                <Link to='/'>Back</Link>
                <h1>{org.name}</h1>
                <p>{org.description}</p>
                <p>Rating: {org.ratings.length !== 0 ? org.avgRating : '-'}/5</p>
                <div>
                    {org.image === '' ? "- - NO IMAGE PROVIDED - -" : <img height='200' src={decodeBuffer(org.imagePath.data)}/>}
                </div>
            </div>
        )
    }


    return (
        <div>
            {isLoading === true ? "loading..." : renderPage()}            
            
        </div>
    )
}

export default OrgInfoPage;