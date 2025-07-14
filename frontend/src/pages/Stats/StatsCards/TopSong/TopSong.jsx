import "./TopSong.css"
import { useState, useRef, useEffect } from 'react';
import { useUpload } from "../../../../hook/ClickContent";
import ArtistLine from "../../ArtistLine/ArtistLine";

export default function TopSong(){
    const [selectedButton, setSelectedButton] = useState("CM")
    const [topSongArray, setTopSongArray] = useState([])
    const monthButtonRef = useRef(null)
    
    return (
        <div className="top-song-card">
            <header className="card-header"> Top 5 Songs</header>
        </div>
    );
}