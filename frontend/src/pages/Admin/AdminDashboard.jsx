// import { useState } from "react";
//
// import Sidebar from "../../components/admin/Sidebar";
// import DashboardHome from "./DashboardHome";
// import VideosManagement from "./VideosManagement";
// import ArticlesManagement from "./ArticlesManagement";
// import EventsManagement from "./EventsManagement";
// import GalleryManagement from "./GalleryManagement";
// import AnnouncementsManagement from "./AnnouncementsManagement";
// import ContactsManagement from "./ContactsManagement";
//
// export default function AdminDashboard() {
//     const [activeTab, setActiveTab] = useState("dashboard");
//
//     return (
//         <div className="admin-layout">
//             <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
//
//             <main className="admin-content">
//                 {activeTab === "dashboard" && <DashboardHome />}
//                 {activeTab === "videos" && <VideosManagement />}
//                 {activeTab === "articles" && <ArticlesManagement />}
//                 {activeTab === "events" && <EventsManagement />}
//                 {activeTab === "announcements" && <AnnouncementsManagement />}
//                 {activeTab === "gallery" && <GalleryManagement />}
//                 {activeTab === "contacts" && <ContactsManagement />}
//             </main>
//         </div>
//     );
// }

import { useState } from "react";

import AdminTopbar from "../../components/admin/AdminTopbar";
import Sidebar from "../../components/admin/Sidebar";

import DashboardHome from "./DashboardHome";
import VideosManagement from "./VideosManagement";
import ArticlesManagement from "./ArticlesManagement";
import EventsManagement from "./EventsManagement";
import GalleryManagement from "./GalleryManagement";
import AnnouncementsManagement from "./AnnouncementsManagement";
import ContactsManagement from "./ContactsManagement";
import HijriDateSettings from "./HijriDateSettings";

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState("dashboard");

    return (
        <div className="admin-shell">
            <AdminTopbar />

            <div className="admin-layout">
                <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

                <main className="admin-content">
                    {activeTab === "dashboard" && <DashboardHome />}
                    {activeTab === "videos" && <VideosManagement />}
                    {activeTab === "articles" && <ArticlesManagement />}
                    {activeTab === "events" && <EventsManagement />}
                    {activeTab === "announcements" && <AnnouncementsManagement />}
                    {activeTab === "gallery" && <GalleryManagement />}
                    {activeTab === "contacts" && <ContactsManagement />}
                    {
                        activeTab === "settings" &&
                        <HijriDateSettings />
                    }
                </main>
            </div>
        </div>
    );
}