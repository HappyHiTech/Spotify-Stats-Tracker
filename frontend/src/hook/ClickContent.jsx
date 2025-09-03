import { createContext, useContext, useState} from 'react';
import { API_BASE_URL } from '../constants';

const UploadContext = createContext();
export const useUpload = () => useContext(UploadContext);

export function ClickProvider({ children }) {
    const [fileName, setFileName] = useState('');
    const [listenTimeData, setListenTimeData] = useState(null);
    const [topArtistData, setTopArtistData] = useState(null);
    const [topSongData, setTopSongData] = useState(null);
    const [uploaded, setUploaded] = useState(false);
    

    const handleChange = async (e) => {
        if (e.target.files.length > 0) {
            const fileUploaded = e.target.files[0]
            const formData = new FormData();
            formData.append('file', fileUploaded);

            const response = await fetch(`${API_BASE_URL}/api/message`);
            console.log(response);
        
            setFileName(fileUploaded.name);
            console.log(`${API_BASE_URL}/api/file_data`)
            fetch(`${API_BASE_URL}/api/file_data`, {
                method: "POST",
                body: formData
            })
                .then((response) => {
                    console.log("response area")
                    return response.json();
                })
                .then((data) => {
                    console.log("HELLOOO")
                    setListenTimeData(data.listenTime);
                    setTopArtistData(data.topArtist);
                    setTopSongData(data.topSong);
                    console.log(data.topArtist);
                    setUploaded(true);
                })

        }
    }


    return (
        <UploadContext.Provider value ={{listenTimeData, topArtistData, topSongData,fileName, handleChange, uploaded}}>
            {children}
        </UploadContext.Provider>
    );
}