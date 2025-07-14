import "./ListenTime.css"
import {useState, useRef, useEffect} from 'react';
import { useUpload } from "../../../../hook/ClickContent";

export default function ListenTime() {
    const [selectedButton, setSelectedButton] = useState("CM")
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
        setSelectedButton(type)
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
        <div className="listen-time-card">
            <header className="card-header">Total Listen Time (Mins)</header>
            <button onClick={() => handleClick("CM")} className={`card-button-l${selectedButton === "CM" ? "-selected" : "" }`} ref={monthButtonRef}>Current Month</button>
            <button onClick={() => handleClick("CY")} className={`card-button-l${selectedButton === "CY" ? "-selected" : "" }`}>Current Year</button>
            <button onClick={() => handleClick("AT")} className={`card-button-l${selectedButton === "AT" ? "-selected" : "" }`}>All Time</button>
            <div className="card-main">{listenTime} Minutes</div>
        </div>
    );
}