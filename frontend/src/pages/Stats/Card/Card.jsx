import "./Card.css"
import {useState, useRef, useEffect} from 'react';
import { useUpload } from "../../../hook/ClickContent";

export default function Card({title, clickFunc}) {
    const [listenTime, setListenTime] = useState('')
    const {listenTimeData, uploaded} = useUpload();
    const monthButtonRef = useRef(null);

    
    useEffect(() => {
        if (uploaded && monthButtonRef.current){
            monthButtonRef.current.focus();
            monthButtonRef.current.click();
        }
    }, [uploaded])

    const handleClick = (type) => {
        const allTime = listenTimeData["allTime"];
        const currentMonth = listenTimeData["currentMonth"];
        const currentYear = listenTimeData["currentYear"];

        if (type == "AT"){
            setListenTime(allTime);
        }
        else if (type == "CM"){
            setListenTime(currentMonth);
        }
        else if (type == "CY"){
            setListenTime(currentYear);
        }
    }

    return (
        <div className="card">
            <header className="card-header">{title}</header>
            <button onClick={() => handleClick("CM")} className="card-button" ref={monthButtonRef}>Current Month</button>
            <button onClick={() => handleClick("CY")} className="card-button">Current Year</button>
            <button onClick={() => handleClick("AT")} className="card-button">All Time</button>
            <div className="card-main">{listenTime} Minutes</div>
        </div>
    );
}