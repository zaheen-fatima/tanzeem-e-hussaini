// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { getVideos } from "../../api/videoApi";
// import { getActiveAnnouncements } from "../../api/announcementApi";
// import { getUpcomingEvents } from "../../api/eventApi";
// import { getTodayPrayerTimes } from "../../api/prayerApi";
//
// export default function Home() {
//     const [videos, setVideos] = useState([]);
//     const [announcements, setAnnouncements] = useState([]);
//     const [events, setEvents] = useState([]);
//     const [prayer, setPrayer] = useState(null);
//
//     useEffect(() => {
//         const loadHomeData = async () => {
//             const videoData = await getVideos(0, 3);
//             const announcementData = await getActiveAnnouncements(0, 3);
//             const eventData = await getUpcomingEvents(0, 3);
//             const prayerData = await getTodayPrayerTimes();
//
//             setVideos(videoData.content || []);
//             setAnnouncements(announcementData.content || []);
//             setEvents(eventData.content || []);
//             setPrayer(prayerData);
//         };
//
//         loadHomeData();
//     }, []);
//
//     return (
//         <main className="home-page">
//             <section className="hero-section">
//                 <h1>Tanzeem-e-Hussaini</h1>
//                 <p>Islamic Portal for Majlis, Matam, Mehfil, Articles, Quran and Community Programs</p>
//                 <Link to="/videos">Explore Videos</Link>
//             </section>
//
//             {prayer && (
//                 <section className="home-section">
//                     <h2>Today Prayer Times - {prayer.city}</h2>
//
//                     <div className="prayer-grid">
//                         <div>Fajr <b>{prayer.fajr}</b></div>
//                         <div>Dhuhr <b>{prayer.dhuhr}</b></div>
//                         <div>Asr <b>{prayer.asr}</b></div>
//                         <div>Maghrib <b>{prayer.maghrib}</b></div>
//                         <div>Isha <b>{prayer.isha}</b></div>
//                     </div>
//
//                     <p className="hijri-text">
//                         Hijri: {prayer.hijriDate} {prayer.hijriMonth} {prayer.hijriYear}
//                     </p>
//                 </section>
//             )}
//
//             <section className="home-section">
//                 <h2>Announcements</h2>
//
//                 <div className="home-grid">
//                     {announcements.map((item) => (
//                         <div className="home-card" key={item.id}>
//                             <h3>{item.title}</h3>
//                             <p>{item.message}</p>
//                             <span>{item.priority}</span>
//                         </div>
//                     ))}
//                 </div>
//             </section>
//
//             <section className="home-section">
//                 <h2>Upcoming Events</h2>
//
//                 <div className="home-grid">
//                     {events.map((event) => (
//                         <div className="home-card" key={event.id}>
//                             <h3>{event.title}</h3>
//                             <p>{event.description}</p>
//                             <span>{event.eventDate}</span>
//                             <span>{event.startTime}</span>
//                         </div>
//                     ))}
//                 </div>
//             </section>
//
//             <section className="home-section">
//                 <h2>Latest Videos</h2>
//
//                 <div className="home-grid">
//                     {videos.map((video) => (
//                         <div className="home-card" key={video.id}>
//                             <img src={video.thumbnailUrl} alt={video.title} />
//                             <h3>{video.title}</h3>
//                             <p>{video.category}</p>
//                             <a href={video.youtubeUrl} target="_blank" rel="noreferrer">
//                                 Watch
//                             </a>
//                         </div>
//                     ))}
//                 </div>
//             </section>
//         </main>
//     );
// }


import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getVideos } from "../../api/videoApi";
import { getActiveAnnouncements } from "../../api/announcementApi";
import { getUpcomingEvents } from "../../api/eventApi";
import { getTodayPrayerTimes } from "../../api/prayerApi";

export default function Home() {
    const [videos, setVideos] = useState([]);
    const [announcements, setAnnouncements] = useState([]);
    const [events, setEvents] = useState([]);
    const [prayer, setPrayer] = useState(null);
    const [prayerError, setPrayerError] = useState(false);
    const [activePanel, setActivePanel] = useState(null);

    useEffect(() => {
        const loadHomeData = async () => {
            try {
                const videoData = await getVideos(0, 3);
                setVideos(videoData.content || []);
            } catch {}

            try {
                const announcementData = await getActiveAnnouncements(0, 6);
                setAnnouncements(announcementData.content || []);
            } catch {}

            try {
                const eventData = await getUpcomingEvents(0, 6);
                setEvents(eventData.content || []);
            } catch {}

            try {
                const prayerData = await getTodayPrayerTimes();
                setPrayer(prayerData);
            } catch {
                setPrayerError(true);
            }
        };

        loadHomeData();


    }, []);

    useEffect(() => {
        const openAnnouncementFromHash = () => {
            if (window.location.hash === "#announcements") {
                setActivePanel("announcements");
            }
        };

        openAnnouncementFromHash();

        window.addEventListener("hashchange", openAnnouncementFromHash);

        return () => {
            window.removeEventListener("hashchange", openAnnouncementFromHash);
        };
    }, []);

    const fallbackImage =
        "https://images.unsplash.com/photo-1564769662533-4f00a87b4056";

    return (
        <main className="royal-home">

            <section className="royal-hero">
                <div className="royal-overlay"></div>

                <div className="royal-hero-content">
                    <span className="royal-pill">
                        Sewak Park • Dwarka Mor • New Delhi
                    </span>

                    <h1>
                        Tanzeem-e-Hussaini
                    </h1>

                    <h2>
                        A Digital Markaz for Azadari, Quran, Knowledge & Community
                    </h2>

                    <p>
                        Watch Majlis and Matam, read Islamic articles, follow upcoming programs,
                        check prayer timings, and stay connected with the community.
                    </p>

                    <div className="royal-actions">
                        <Link to="/quran">Read Quran</Link>
                        <Link to="/videos" className="royal-outline">Watch Majlis</Link>
                    </div>
                </div>

                <div className="royal-prayer-card">
                    <h3>Today’s Prayer Times</h3>

                    {prayer ? (
                        <>
                            <p className="prayer-location">
                                {prayer.city}, {prayer.country}
                            </p>

                            <div className="main-prayer">
                                <span>{prayer.day || "Today"}</span>
                                <h2>{prayer.gregorianDate}</h2>
                                <p>{prayer.hijriDate}</p>
                            </div>

                            <button onClick={() => setActivePanel("prayer")}>
                                View All Timings
                            </button>
                        </>
                    ) : prayerError ? (
                        <p>Prayer timings are currently unavailable.</p>
                    ) : (
                        <p>Loading prayer times...</p>
                    )}
                </div>            </section>

            <section className="royal-quick-access">
                <button onClick={() => setActivePanel("announcements")}>
                    <span>01</span>
                    <h3>Announcements</h3>
                    <p>Tap to view latest notices</p>
                </button>

                <Link to="/events">
                    <span>02</span>
                    <h3>Upcoming Events</h3>
                    <p>Majlis, Mehfil and programs</p>
                </Link>

                <Link to="/articles">
                    <span>03</span>
                    <h3>Articles</h3>
                    <p>Karbala, Quran and Ahlul Bayt</p>
                </Link>

                <Link to="/gallery">
                    <span>04</span>
                    <h3>Gallery</h3>
                    <p>Community memories</p>
                </Link>
            </section>

            <section className="royal-video-section">
                <div className="royal-section-title">
                    <span>Latest Uploads</span>
                    <h2>Majlis & Program Videos</h2>
                    <p>Selected videos from Tanzeem-e-Hussaini programs</p>
                </div>

                <div className="royal-video-grid">
                    {videos.length > 0 ? (
                        videos.map((video) => (
                            <article className="royal-video-card" key={video.id}>
                                <img
                                    src={video.thumbnailUrl || fallbackImage}
                                    alt={video.title}
                                />

                                <div>
                                    <span>{video.category}</span>
                                    <h3 title={video.title}>
                                        {video.title.length > 60
                                            ? video.title.substring(0, 60) + "..."
                                            : video.title}
                                    </h3>
                                    <p>{video.speaker || "Tanzeem-e-Hussaini"}</p>

                                    <a
                                        href={video.mediaType === "UPLOAD" ? video.videoFileUrl : video.youtubeUrl}
                                        target="_blank"
                                        rel="noreferrer"
                                    >
                                        Watch Now
                                    </a>
                                </div>
                            </article>
                        ))
                    ) : (
                        <div className="royal-empty-card">
                            Latest videos will appear here after admin uploads them.
                        </div>
                    )}
                </div>
            </section>

            {activePanel && (
                <div className="royal-popup-overlay" onClick={() => setActivePanel(null)}>
                    <div className="royal-popup" onClick={(e) => e.stopPropagation()}>
                        <button className="royal-close" onClick={() => setActivePanel(null)}>
                            ×
                        </button>

                        {activePanel === "prayer" && prayer && (
                            <>
                                <h2>Today’s Prayer Times</h2>

                                <div className="royal-popup-grid">
                                    <div><span>Fajr</span><b>{prayer.fajr}</b></div>
                                    <div><span>Sunrise</span><b>{prayer.sunrise}</b></div>
                                    <div><span>Zuhr</span><b>{prayer.dhuhr}</b></div>
                                    <div><span>Asr</span><b>{prayer.asr}</b></div>
                                    <div><span>Maghrib</span><b>{prayer.maghrib}</b></div>
                                    <div><span>Isha</span><b>{prayer.isha}</b></div>
                                </div>
                            </>
                        )}

                        {activePanel === "announcements" && (
                            <>
                                <h2>Announcements</h2>

                                <div className="royal-popup-scroll">
                                    {announcements.map((item) => (
                                        <div className="royal-popup-item" key={item.id}>
                                            <span>{item.priority}</span>
                                            <h3>{item.title}</h3>
                                            <p>{item.message}</p>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}

                        {activePanel === "events" && (
                            <>
                                <h2>Upcoming Events</h2>

                                <div className="royal-popup-scroll">
                                    {events.map((event) => (
                                        <div className="royal-popup-item" key={event.id}>
                                            <span>{event.eventDate}</span>
                                            <h3>{event.title}</h3>
                                            <p>{event.location}</p>
                                            <small>{event.startTime}</small>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </main>
    );
}