import "./FileBox.css"
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import {useState, useRef} from 'react';
import { useUpload } from "../../../../hook/ClickContent";

export default function FileBox(){
    const { handleChange, fileName } = useUpload();
    const fileInputRef = useRef(null);

    const handleClick = () => {
        fileInputRef.current.click();
    }

    
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