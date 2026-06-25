import { useNavigate } from "react-router-dom";

export default function AdminTopbar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/admin/login");
    };

    return (
        <header className="admin-topbar">
            <h2>Tanzeem-e-Hussaini Admin Portal</h2>

            <div>
                <button onClick={() => navigate("/")}>
                    View Website
                </button>

                <button className="topbar-logout" onClick={handleLogout}>
                    Logout
                </button>
            </div>
        </header>
    );
}