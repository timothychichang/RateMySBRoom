import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FilePond, registerPlugin } from 'react-filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';


// Register the plugins
registerPlugin(FilePondPluginImagePreview, 
                FilePondPluginFileEncode
);

const AddRoomPage = () => {

    const [roomName, setRoomName] = useState('');
    const [files, setFiles] = useState([]);


    const handleSubmit = async(e) => {
        e.preventDefault();

        let imageEncodedFile;
        if (files.length === 0) {
            imageEncodedFile = null;
        }
        else {
            imageEncodedFile = files[0].getFileEncodeBase64String();
        }

        const userRoom = {
            name: roomName,
            image: imageEncodedFile
        };
        await axios.post('http://localhost:5000', userRoom).then((response) => {
            console.log(response.status);
        });
        window.location.reload();
    }

    

    return (
        <div>
            <Link to='/'>Back</Link>
            <h1>Add an Apartment</h1>
            <div>
                <form onSubmit={handleSubmit}>  
                    <p>Post Apartment Form</p>
                    <div>
                        <label>Name: </label>
                        <input
                            type='text'
                            name='roomName'
                            placeholder='enter a name...'
                            value={roomName}
                            onChange={(e) => setRoomName(e.target.value)}         
                        />
                    </div>
                    <div>
                        <FilePond
                            files={files}
                            onupdatefiles={setFiles}
                            allowMultiple={false}
                            maxFiles={1}
                            name="files"
                            labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                        />
                    </div>
                    <button type='submit'>Post</button>
                </form>
            </div>
        </div>
    )
}

export default AddRoomPage;