import "./Stats.css"
import Card from "./Card/card";
import { useState } from "react";
import { useUpload } from "../../hook/ClickContent";

export default function Stats(){

    return (
        <div className="stats-body">    
            <Card />
            
        </div>
    );
}