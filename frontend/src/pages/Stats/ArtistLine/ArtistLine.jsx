import "./ArtistLine.css"

export default function ArtistLine({artistImg, artistName, artistListenTime}) {
    return (
        
        <div className="artist-line">
            <img className="artist-img" src={artistImg}></img>
            <section className="artist-info">
                <p className="artist-name">{artistName}</p>
                <p className="artist-listen-time">{artistListenTime}</p>
            </section>
        </div>
        
    );
}