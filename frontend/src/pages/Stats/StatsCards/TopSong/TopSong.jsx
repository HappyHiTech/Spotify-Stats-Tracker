import "./TopSong.css"
import { useState, useRef, useEffect } from 'react';
import { useUpload } from "../../../../hook/ClickContent";
import ArtistLine from "../../ArtistLine/ArtistLine";

export default function TopSong(){
    const [selectedButton, setSelectedButton] = useState("CM")
    const [topSongArray, setTopSongArray] = useState([])
    const {topSongData, uploaded} = useUpload();
    const monthButtonRef = useRef(null)

    useEffect(() => {
        monthButtonRef.current.focus();
        monthButtonRef.current.click();
    }, [uploaded])

    const songLines = topSongArray.map((data) => {
            return (
                <ArtistLine 
                    artistImg={data["img"]}
                    artistName={data["name"]}
                    artistListenTime={
                        <>
                            Listen Time: {data["listenTime"]} min 
                            <br />
                            Times Played: {data["timesPlayed"]}
                        </>
                        
                    }
                />
            )
        })

    const handleClick = (type) => {
        setSelectedButton(type)
        const allTime = topSongData["allTime"];
        const currentMonth = topSongData["currentMonth"];
        const currentYear = topSongData['currentYear'];

        if (type == "AT"){
            setTopSongArray(allTime);
        }
        else if (type == "CM"){
            setTopSongArray(currentMonth);
        }
        else if (type == "CY"){
            setTopSongArray(currentYear);
        }
        
    }
    
    return (
        <div className="top-song-card">
            <header className="card-header"> Top 5 Songs</header>
            <button onClick={() => handleClick("CM")} className={`card-button-s${selectedButton === "CM" ? "-selected" : "" }`} ref={monthButtonRef}>Current Month</button>
            <button onClick={() => handleClick("CY")} className={`card-button-s${selectedButton === "CY" ? "-selected" : "" }`}>Current Year</button>
            <button onClick={() => handleClick("AT")} className={`card-button-s${selectedButton === "AT" ? "-selected" : "" }`}>All Time</button>
            <div className="song-list">
                 {songLines}
                
            </div>
        </div>
    );
}