import "./FileUpload.css"
import FileBox from "./FileBox/FileBox";

export default function FileUpload() {
    const handleTestFileDownload = () => {
        // Create a link element to trigger download
        const link = document.createElement('a');
        link.href = '/test_spotify_data.zip';
        link.download = 'test_spotify_data.zip';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="file-upload-body">
            <div className="upload-section">
                <FileBox />
            </div>
            <div className="processing-warning">
                <div className="warning-content">
                    <span className="warning-icon">⏱️</span>
                    <div className="warning-text">
                        <h4>Processing Time Notice</h4>
                        <p>Large Spotify data files may take several minutes to process. Please be patient while we analyze your listening history.</p>
                    </div>
                </div>
            </div>
            <div className="test-file-section">
                <div className="test-file-content">
                    <h3>Want to try it first?</h3>
                    <p>Download our sample test file to see how the app works without uploading your own data.</p>
                    <button 
                        className="download-test-btn"
                        onClick={handleTestFileDownload}
                    >
                        📁 Download Test File
                    </button>
                    <div className="test-file-info">
                        <small>
                            <strong>Test File Includes:</strong><br/>
                            • 20 sample listening sessions<br/>
                            • Data from Sept-Dec 2025<br/>
                            • 4 classic songs (Queen, Eagles, Led Zeppelin, John Lennon)<br/>
                            • Only 1.2KB - perfect for testing!
                        </small>
                    </div>
                </div>
            </div>
        </div>
    );
}