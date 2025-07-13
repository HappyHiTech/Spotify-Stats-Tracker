import "./FileBox.css"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {useState, useRef} from 'react';
import { useClick } from "../../../../hook/ClickContent";

export default function FileBox(){
    const { handleChange, fileName } = useClick();
    const fileInputRef = useRef(null);

    const handleClick = () => {
        fileInputRef.current.click();
    }

    // const handleChange = (e) => {
    //     if (e.target.files.length > 0) {
    //         const fileUploaded = e.target.files[0]
    //         const formData = new FormData();
    //         formData.append('file', fileUploaded);
        
    //         setFileName(fileUploaded.name);
    //         console.log(fileUploaded);

    //         fetch ("http://127.0.0.1:5000/api/file_data", {
    //             method: "POST",
    //             body: formData
    //         })
    //             .then((response) => {
    //                 console.log(response)
    //             })
    //     }
    // }
    
    return (
        <div 
            className="file-upload-box"
            onClick={handleClick}>

            <input
                type="file"
                ref={fileInputRef}
                onChange={handleChange}
                className="file-input"
                hidden
            />
            <CloudUploadIcon />
            <p>{fileName ? `Selected File: ${fileName}` : 'Drag & Drop or Click to Upload'}</p>
        </div>
    );
}