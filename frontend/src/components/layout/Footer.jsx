import { Link } from "react-router-dom";

export default function Footer() {
    const address =
        "Tanzeem-e-Hussaini, Sewak Park, Dwarka Mor, New Delhi - 110059";

    return (
        <footer className="site-footer">
            <div className="footer-glow"></div>

            <div className="footer-header">
                <h2>Tanzeem-e-Hussaini</h2>
                <p>
                    A digital platform for Azadari, Quran, Majlis, Matam,
                    community updates and Islamic knowledge.
                </p>
            </div>

            <div className="footer-grid">
                <div className="footer-card">
                    <h3>Location</h3>

                    <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        📍 {address}
                    </a>

                    <Link className="footer-contact-btn" to="/contact">
                        🤝 Get in Touch
                    </Link>
                </div>

                <div className="footer-card">
                    <h3>Contact Us</h3>

                    <a href="mailto:tanzeem.e.hussaini.delhi@gmail.com">
                        📧 tanzeem.e.hussaini.delhi@gmail.com
                    </a>

                    <a href="tel:+919818258208">
                        📞 Call Us
                    </a>

                    <a
                        href="https://wa.me/919818258208"
                        target="_blank"
                        rel="noreferrer"
                    >
                        💬 Chat on WhatsApp
                    </a>

                    <div className="footer-socials">
                        <a
                            className="facebook-icon"
                            href="https://www.facebook.com/tanzeemehussainii"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="Facebook"
                        >
                            f
                        </a>

                        <a className="youtube"
                            href="https://www.youtube.com/@tanzeem-e-hussaini"
                            target="_blank"
                            rel="noreferrer"
                            aria-label="YouTube"
                        >
                            ▶
                        </a>
                    </div>
                </div>

                <div className="footer-card">
                    <h3>Quick Links</h3>

                    <Link to="/articles">Articles</Link>
                    <Link to="/gallery">Gallery</Link>
                    <a href="/#announcements">Announcements</a>
                    <Link to="/events">Upcoming Events</Link>

                </div>
            </div>

            <div className="footer-credit">
                <p>
                    Islamic portal created by <strong>Zaheen Fatima</strong>, W/O Sahar Abbas Zaidi, Sewak Park.
                </p>
                <p>Please remember us in your prayers.</p>
            </div>
        </footer>
    );
}