import { createContext, useContext, useState} from 'react';

const UploadContext = createContext();
export const useUpload = () => useContext(UploadContext)

export function ClickProvider({ children }) {
    const [fileName, setFileName] = useState('');
    const [listenTimeData, setListenTimeData] = useState(null);
    const [uploaded, setUploaded] = useState(false)
    

    const handleChange = (e) => {
        if (e.target.files.length > 0) {
            const fileUploaded = e.target.files[0]
            const formData = new FormData();
            formData.append('file', fileUploaded);
        
            setFileName(fileUploaded.name);
            
            console.log(fileUploaded);

            fetch ("http://127.0.0.1:5000/api/file_data", {
                method: "POST",
                body: formData
            })
                .then((response) => {
                    return response.json()
                })
                .then((data) => {
                    setListenTimeData(data.listenTime)
                    setUploaded(true)
                })
        }
    }


    return (
        <UploadContext.Provider value ={{listenTimeData, fileName, handleChange, uploaded}}>
            {children}
        </UploadContext.Provider>
    );
}