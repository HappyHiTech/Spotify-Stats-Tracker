import "./Stats.css"
import ListenTime from "./StatsCards/ListenTime/ListenTime";
import TopArtist from "./StatsCards/TopArtist/TopArtist";
import TopSong from "./StatsCards/TopSong/TopSong";
import { useState } from "react";
import { useUpload } from "../../hook/ClickContent";

export default function Stats(){

    return (
        <div className="stats-body">    
            <ListenTime />
            <TopArtist />
            <TopSong />
            
        </div>
    );
}