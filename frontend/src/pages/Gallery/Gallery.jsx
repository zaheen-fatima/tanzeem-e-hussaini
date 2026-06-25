import { useEffect, useState } from "react";
import { getGalleryItems } from "../../api/galleryApi";
import Pagination from "../../components/common/Pagination.jsx";

const categories = [
    "All",
    "Muharram",
    "Majlis",
    "Matam",
    "Ramzan",
    "Eid",
    "Quran Programs",
    "Community Events",
    "Youth Programs",
    "Special Events",
    "Niaz / Langar",
    "Miscellaneous"
];

export default function Gallery() {
    const [items, setItems] = useState([]);
    const [pageData, setPageData] = useState(null);
    const [page, setPage] = useState(0);
    const [activeCategory, setActiveCategory] = useState("All");

    const fallbackImage =
        "https://images.unsplash.com/photo-1564769662533-4f00a87b4056";

    const fetchGallery = async () => {
        const data = await getGalleryItems(page, 9);
        setItems(data.content || []);
        setPageData(data);
    };
    const filteredItems =
        activeCategory === "All"
            ? items
            : items.filter(
                item => item.category === activeCategory
            );

    useEffect(() => {
        fetchGallery();
    }, [page]);

    return (
        <main className="public-page">
            <h1>Gallery</h1>

            <div className="public-filters">
                {categories.map((category) => (
                    <button
                        key={category}
                        className={
                            activeCategory === category
                                ? "active"
                                : ""
                        }
                        onClick={() => setActiveCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>
            {filteredItems.length === 0 && (
                <div className="empty-public-state">
                    <h2>No images available</h2>
                    <p>
                        Gallery photos will appear here after
                        admin uploads them.
                    </p>
                </div>
            )}

            <div className="gallery-grid">
                {filteredItems.map((item) => (
                    <div className="gallery-card" key={item.id}>
                        <img
                            src={item.imageUrl || fallbackImage}
                            alt={item.title}
                        />

                        <div>
                            <h3>{item.title}</h3>
                            <p>{item.category}</p>
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