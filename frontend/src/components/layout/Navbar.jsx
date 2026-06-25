import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="navbar">
            <Link to="/" className="logo">
                Tanzeem-e-Hussaini
            </Link>

            <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/videos">Videos</Link>
                <Link to="/articles">Articles</Link>
                <Link to="/events">Events</Link>
                <Link to="/gallery">Gallery</Link>
                <Link to="/quran">Quran</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/admin">Admin</Link>
            </div>
        </nav>
    );
}