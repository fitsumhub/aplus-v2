import React, { useEffect, useState } from 'react';
import Back from "../common/back/Back";
import './video.css'; // Import the CSS file

const Video = () => {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearchQuery, setDebouncedSearchQuery] = useState('');

    useEffect(() => {
        fetchVideos();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearchQuery(searchQuery);
        }, 500); // Adjust debounce delay as needed (e.g., 500ms)

        return () => {
            clearTimeout(timer);
        };
    }, [searchQuery]);

    useEffect(() => {
        fetchVideos();
    }, [debouncedSearchQuery]);

    const fetchVideos = async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?key=AIzaSyAOKe_VuQHKROQzrlc7Sn9f28yiLeahkYQ&playlistId=UULFzitcKY4ZPtQBzS_1_OfiiQ&part=snippet&maxResults=50`);
            if (!response.ok) {
                throw new Error('Failed to fetch videos');
            }
            const data = await response.json();
            setVideos(data.items);
            setLoading(false);
            setError(null); // Reset error state on successful fetch
        } catch (error) {
            console.error('Error fetching YouTube videos:', error);
            setError('Failed to fetch videos. Please try again later.');
            setLoading(false);
        }
    };

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    return (
        <div className="video-container">
            <Back title="Back" />
            <div className="search-container">
                <input
                    type="text"
                    placeholder="Search videos..."
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                />
            </div>
            {loading ? (
                <p class="loader">  Loading videos...</p>
            ) : error ? (
                <p>{error}</p>
            ) : videos && videos.length > 0 ? (
                videos.map((video) => (
                    <div key={video.snippet.resourceId.videoId} className="video-wrapper">
                        <iframe
                            title={video.snippet.title}
                            src={`https://www.youtube.com/embed/${video.snippet.resourceId.videoId}`}
                            frameBorder="0"
                            allowFullScreen
                        ></iframe>
                        <h3>{video.snippet.title}</h3>
                        <p>{video.snippet.description}</p>
                    </div>
                ))
            ) : (
                <p>No videos found.</p>
            )}
        </div>
    );
};

export default Video;
