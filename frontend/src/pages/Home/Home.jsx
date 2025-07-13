import "./Home.css"
import Heading from "./Heading/Heading";
import FileUpload from "./FileUpload/FileUpload";
import Stats from "../Stats/Stats";
import ClickProvider from "../../hook/ClickContent";
import "@fontsource/ibm-plex-sans";
import "@fontsource/ibm-plex-sans/700.css";


export default function Home(){
    const handleClick = () => {
        console.log("I have been clicked")
        fetch("http://127.0.0.1:5000/api/message")
            .then((response) => {
                return response;
            })
    };

    return (
        <div className="home-page-body">
            <ClickProvider>
                <Heading />
                <FileUpload />
                <Stats />
            </ClickProvider>
        </div>
    );
}