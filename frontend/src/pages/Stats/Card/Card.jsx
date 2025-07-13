import "./Card.css"
import {useState, useRef, useEffect} from 'react';
import { useClick } from "../../../hook/ClickContent";

export default function Card() {
    const [totalTime, setTotalTime] = useState('')
    const {listenTimeData, uploaded} = useClick();
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
            setTotalTime(allTime);
        }
        else if (type == "CM"){
            setTotalTime(currentMonth);
        }
        else if (type == "CY"){
            setTotalTime(currentYear);
        }
    }

    return (
        <div className="card">
            <header className="card-header"> Total Amount Listened (mins)</header>
            <button onClick={() => handleClick("CM")} className="card-button" ref={monthButtonRef}>Current Month</button>
            <button onClick={() => handleClick("CY")} className="card-button">Current Year</button>
            <button onClick={() => handleClick("AT")} className="card-button">All Time</button>
            <div className="card-main">{totalTime} Minutes</div>
        </div>
    );
}