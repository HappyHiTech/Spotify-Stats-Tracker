import "./TopArtist.css"
import { useState, useRef, useEffect } from 'react';
import { useUpload } from "../../../../hook/ClickContent";
import ArtistLine from "../../ArtistLine/ArtistLine";

export default function TopArtist(){
    const [selectedButton, setSelectedButton] = useState("CM")
    const [topArtistArray, setTopArtistArrayList] = useState([])
    const {topArtistData, uploaded} = useUpload();
    const monthButtonRef = useRef(null);

    useEffect(() => {
        monthButtonRef.current.focus();
        monthButtonRef.current.click();
    }, [uploaded])

    const artistLines = topArtistArray.map((data) => {
        return (
            <ArtistLine 
                artistImg={data["artistImg"]}
                artistName={data["artistName"]}
                artistListenTime={`Listen Time: ${data["listenTime"]} min`}
            />
        )
    })

    const handleClick = (type) => {
        setSelectedButton(type)
        const allTime = topArtistData["allTime"];
        const currentMonth = topArtistData["currentMonth"];
        const currentYear = topArtistData['currentYear'];

        if (type == "AT"){
            setTopArtistArrayList(allTime);
        }
        else if (type == "CM"){
            setTopArtistArrayList(currentMonth);
        }
        else if (type == "CY"){
            setTopArtistArrayList(currentYear);
        }
        
    }

    

    return (
        <div className="top-artist-card">
            <header className="card-header">Top 5 Artist</header>
            <button onClick={() => handleClick("CM")} className={`card-button-t-${selectedButton === "CM" ? "selected" : "" }`} ref={monthButtonRef}>Current Month</button>
            <button onClick={() => handleClick("CY")} className={`card-button-t-${selectedButton === "CY" ? "selected" : "" }`}>Current Year</button>
            <button onClick={() => handleClick("AT")} className={`card-button-t-${selectedButton === "AT" ? "selected" : "" }`}>All Time</button>
            <div className="artist-list">
                {artistLines}
                {/* <ArtistLine 
                    artistImg="https://i.scdn.co/image/ab6761610000e5eb49799010fa77f1f862ab207e" 
                    artistName="Wave to Earth" 
                    artistListenTime="Listen Time: 100,000 min"
                /> */}
                
                
            </div>
        </div>
    );
}
