import { useNavigate } from "react-router-dom";

export default function Sidebar({ activeTab, setActiveTab }) {
    const navigate = useNavigate();

    const menuItems = [
        { key: "dashboard", label: "Dashboard" },
        { key: "videos", label: "Videos" },
        { key: "articles", label: "Articles" },
        { key: "events", label: "Events" },
        { key: "announcements", label: "Announcements" },
        { key: "gallery", label: "Gallery" },
        { key: "contacts", label: "Contacts" }
    ];

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/admin/login");
    };

    return (
        <aside className="admin-sidebar">

            {menuItems.map((item) => (
                <button
                    key={item.key}
                    className={activeTab === item.key ? "active" : ""}
                    onClick={() => setActiveTab(item.key)}
                >
                    {item.label}
                </button>
            ))}
            <button
                className={activeTab === "settings" ? "active" : ""}
                onClick={() => setActiveTab("settings")}
            >
                Settings
            </button>
            <button className="logout-btn" onClick={handleLogout}>
                Logout
            </button>
        </aside>
    );
}