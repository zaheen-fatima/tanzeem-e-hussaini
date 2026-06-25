import { useEffect, useState } from "react";
import { getDashboardStats } from "../../api/dashboardApi";

export default function DashboardHome() {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            const data = await getDashboardStats();
            setStats(data);
        };

        fetchStats();
    }, []);

    if (!stats) {
        return <h1>Loading Dashboard...</h1>;
    }

    return (
        <div className="dashboard-home">
            <h1>Dashboard</h1>

            <div className="dashboard-cards">
                <div className="dashboard-card">
                    <h3>Videos</h3>
                    <p>{stats.videos}</p>
                </div>

                <div className="dashboard-card">
                    <h3>Articles</h3>
                    <p>{stats.articles}</p>
                </div>

                <div className="dashboard-card">
                    <h3>Events</h3>
                    <p>{stats.events}</p>
                </div>

                <div className="dashboard-card">
                    <h3>Announcements</h3>
                    <p>{stats.announcements}</p>
                </div>

                <div className="dashboard-card">
                    <h3>Gallery</h3>
                    <p>{stats.galleryItems}</p>
                </div>

                <div className="dashboard-card">
                    <h3>Contacts</h3>
                    <p>{stats.contactMessages}</p>
                </div>
            </div>
        </div>
    );
}