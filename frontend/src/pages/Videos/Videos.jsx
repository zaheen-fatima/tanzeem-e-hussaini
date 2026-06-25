import { useEffect, useState } from "react";
import {
    getVideos,
    getVideosByCategory
} from "../../api/videoApi";
import Pagination from "../../components/common/Pagination.jsx";

const categories = [
    "All",
    "Majlis",
    "Matam",
    "Mehfil",
    "Noha",
    "Quran",
    "Muharram",
    "Ramzan",
    "Special Event",
    "Miscellaneous"
];

export default function Videos() {
    const [videos, setVideos] = useState([]);
    const [pageData, setPageData] = useState(null);
    const [page, setPage] = useState(0);
    const [activeCategory, setActiveCategory] = useState("All");

    const fallbackImage =
        "https://www.reviewofreligions.org/wp-content/uploads/2022/08/Karbala-small-shutterstock_1540235519-990x662.jpeg";

    const fetchVideos = async () => {
        const data =
            activeCategory === "All"
                ? await getVideos(page, 8)
                : await getVideosByCategory(activeCategory, page, 8);

        setVideos(data.content || []);
        setPageData(data);
    };

    useEffect(() => {
        fetchVideos();
    }, [page, activeCategory]);

    const handleCategoryChange = (category) => {
        setActiveCategory(category);
        setPage(0);
    };

    const getVideoLink = (video) => {
        return video.mediaType === "UPLOAD"
            ? video.videoFileUrl
            : video.youtubeUrl;
    };

    return (
        <main className="public-page">
            <h1>Majlis & Program Videos</h1>

            <div className="public-filters">
                {categories.map((category) => (
                    <button
                        key={category}
                        className={activeCategory === category ? "active" : ""}
                        onClick={() => handleCategoryChange(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            {videos.length === 0 && (
                <div className="empty-public-state">
                    <h2>No videos available yet</h2>
                    <p>Videos will appear here after admin uploads them.</p>
                </div>
            )}

            <div className="video-grid">
                {videos.map((video) => (
                    <div className="video-card" key={video.id}>
                        <img
                            src={video.thumbnailUrl || fallbackImage}
                            alt={video.title}
                        />

                        <div className="video-card-body">
                            <span>{video.mediaType || "YOUTUBE"}</span>

                            <h3>{video.title}</h3>
                            <p>{video.description}</p>

                            <span>{video.category}</span>
                            <span>{video.speaker}</span>
                            <span>{video.eventDate}</span>

                            <a
                                href={getVideoLink(video)}
                                target="_blank"
                                rel="noreferrer"
                            >
                                Watch Video
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            <Pagination
                pageData={pageData}
                page={page}
                setPage={setPage}
            />
        </main>
    );
}