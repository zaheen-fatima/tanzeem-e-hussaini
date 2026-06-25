import { useEffect, useState } from "react";
import { getEvents } from "../../api/eventApi";
import Pagination from "../../components/common/Pagination.jsx";

export default function Events() {
    const [events, setEvents] = useState([]);
    const [pageData, setPageData] = useState(null);
    const [page, setPage] = useState(0);

    const fetchEvents = async () => {
        const data = await getEvents(page, 6);
        setEvents(data.content || []);
        setPageData(data);
    };

    useEffect(() => {
        fetchEvents();
    }, [page]);

    return (
        <main className="public-page">
            <h1>Upcoming Events</h1>

            <div className="home-grid">
                {events.map((event) => (
                    <div className="home-card" key={event.id}>
                        {event.bannerImageUrl && (
                            <img className="event-banner" src={event.bannerImageUrl} alt={event.title} />
                        )}

                        <h3>{event.title}</h3>
                        <p>{event.description}</p>
                        {event.khitabatBy && (
                            <span>Khitabat By: {event.khitabatBy}</span>
                        )}
                        <span>Date: {event.eventDate}</span>
                        <span>Time: {event.startTime}</span>
                        <span>Location: {event.location}</span>
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