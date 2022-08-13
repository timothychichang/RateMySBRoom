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

const AddOrgPage = () => {

    const [orgName, setOrgName] = useState('');
    const [files, setFiles] = useState([]);


    const handleSubmit = async(e) => {
        e.preventDefault();

        const userDescription = document.getElementById('description');
        let imageEncodedFile;
        if (files.length === 0) {
            imageEncodedFile = null;
        }
        else {
            imageEncodedFile = files[0].getFileEncodeBase64String();
        }

        const userOrg = {
            name: orgName,
            description: userDescription.value,
            image: imageEncodedFile
        };
        await axios.post('http://localhost:5000', userOrg).then((response) => {
            console.log(response.status);
        });
        window.location.reload();
    }

    

    return (
        <div>
            <Link to='/'>Back</Link>
            <h1>Add an Organization</h1>
            <div>
                <form onSubmit={handleSubmit}>  
                    <p>Post Organization Form</p>
                    <div>
                        <label>Name: </label>
                        <input
                            type='text'
                            name='orgName'
                            placeholder='enter a name...'
                            value={orgName}
                            onChange={(e) => setOrgName(e.target.value)}         
                        />
                    </div>
                    <div>
                        <label>Description: </label>
                        <textarea name='description' id='description'></textarea>
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

export default AddOrgPage;