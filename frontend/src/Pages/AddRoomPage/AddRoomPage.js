import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../../Components/Navbar/Navbar.js';
import Popup from '../../Components/Popup/Popup.js';
import './AddRoomPage.css';
import { useNavigate } from 'react-router-dom';

import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginFileValidateSize from 'filepond-plugin-file-validate-size';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';


// Register the plugins
registerPlugin(FilePondPluginImagePreview, 
                FilePondPluginFileEncode, 
                FilePondPluginImageResize,
                FilePondPluginFileValidateSize);

const AddRoomPage = () => {

    const [roomName, setRoomName] = useState('');
    const [files, setFiles] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUser();
    }, []);

    function fetchUser() {
        const userData = window.localStorage.getItem('USER');
        if (userData !== null) {
            setUser(JSON.parse(userData));
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault();
        let imageEncodedFile;
        
        if (user === null) {
            setShowPopup(true);
        }
        else if (roomName === '') {
            // no name entered
            console.log('Please enter a name')
        }
        else if (files.length === 0) {
            // no image uploaded
            imageEncodedFile = null;
            const userRoom = {
                name: roomName,
                image: imageEncodedFile
            };
            await axios.post('http://localhost:5000', userRoom).then((response) => {
                console.log(response.status);
            });
            navigate('/');
        }
        else {
            // image uploaded
            if (files[0].fileSize > 1000000) {
                console.log('file size too large')
            }
            else {
                imageEncodedFile = files[0].getFileEncodeBase64String();
                const userRoom = {
                    name: roomName,
                    image: imageEncodedFile
                };
                
                await axios.post('http://localhost:5000', userRoom).then((response) => {
                    console.log(response.status);
                });
                navigate('/');
            }   
        }
    }


    return (
        <div>
            <Navbar/>
            <h1>Add a New Room</h1>
            <div>
                <form onSubmit={handleSubmit}>  
                    <div>
                        <p>Dorm / Apartment Name: </p>
                        <input
                            type='text'
                            name='roomName'
                            placeholder='enter name...'
                            value={roomName}
                            onChange={(e) => setRoomName(e.target.value)}         
                        />
                    </div>
                    <div className='filepond-container'>
                        <FilePond
                            files={files}
                            onupdatefiles={setFiles}
                            allowMultiple={false}
                            maxFiles={1}
                            name="files"
                            imageResizeTargetWidth='200px'
                            imageResizeTargetHeight='250px'
                            imageResizeUpscale={false}
                            maxFileSize='1MB'
                            labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                        />
                    </div>
                    <button type='submit'>Post</button>
                </form>
            </div>
            {showPopup === true ? <Popup setShowPopup={setShowPopup} /> : null}
        </div>
    )
}

export default AddRoomPage;