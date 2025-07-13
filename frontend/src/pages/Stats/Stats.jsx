import "./Stats.css"
import ListenTime from "./StatsCards/ListenTime/ListenTime";
import { useState } from "react";
import { useUpload } from "../../hook/ClickContent";

export default function Stats(){

    return (
        <div className="stats-body">    
            <ListenTime />
            
        </div>
    );
}