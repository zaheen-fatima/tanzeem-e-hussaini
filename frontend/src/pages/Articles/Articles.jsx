import { useEffect, useState } from "react";
import { getArticles } from "../../api/articleApi";
import Pagination from "../../components/common/Pagination.jsx";

const categories = [
    "All",
    "Muharram",
    "Karbala",
    "Azadari",
    "Ahlul Bayt",
    "Quran",
    "Islamic Guidance",
    "Community Service",
    "Youth",
    "Special"
];

export default function Articles() {
    const [articles, setArticles] = useState([]);
    const [pageData, setPageData] = useState(null);
    const [page, setPage] = useState(0);
    const [activeCategory, setActiveCategory] = useState("All");
    const [selectedArticle, setSelectedArticle] = useState(null);

    const fallbackImage =
        "https://images.unsplash.com/photo-1564769662533-4f00a87b4056";

    const fetchArticles = async () => {
        const data = await getArticles(page, 6);
        setArticles(data.content || []);
        setPageData(data);
    };

    useEffect(() => {
        fetchArticles();
    }, [page]);

    const filteredArticles =
        activeCategory === "All"
            ? articles
            : articles.filter((article) => article.category === activeCategory);

    return (
        <main className="public-page">
            <h1>Islamic Articles</h1>

            <div className="public-filters">
                {categories.map((category) => (
                    <button
                        key={category}
                        className={activeCategory === category ? "active" : ""}
                        onClick={() => setActiveCategory(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="article-grid">
                {filteredArticles.map((article) => (
                    <article className="article-card" key={article.id}>
                        <img
                            src={article.coverImageUrl || fallbackImage}
                            alt={article.title}
                        />

                        <div className="article-card-body">
                            <span>{article.category}</span>

                            <h3>{article.title}</h3>

                            <p className="article-desc">
                                {article.shortDescription ||
                                    `${article.content?.slice(0, 140)}...`}
                            </p>

                            <small>
                                By {article.author || "Tanzeem-e-Hussaini"}
                            </small>

                            <button onClick={() => setSelectedArticle(article)}>
                                Read Article
                            </button>
                        </div>
                    </article>
                ))}
            </div>

            <Pagination
                pageData={pageData}
                page={page}
                setPage={setPage}
            />

            {selectedArticle && (
                <div
                    className="royal-popup-overlay"
                    onClick={() => setSelectedArticle(null)}
                >
                    <div
                        className="article-popup"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="royal-close"
                            onClick={() => setSelectedArticle(null)}
                        >
                            ×
                        </button>

                        <img
                            src={selectedArticle.coverImageUrl || fallbackImage}
                            alt={selectedArticle.title}
                        />

                        <span>{selectedArticle.category}</span>

                        <h2>{selectedArticle.title}</h2>

                        {selectedArticle.shortDescription && (
                            <p className="article-popup-desc">
                                {selectedArticle.shortDescription}
                            </p>
                        )}

                        <small>
                            By {selectedArticle.author || "Tanzeem-e-Hussaini"}
                        </small>

                        <div className="article-content">
                            {selectedArticle.content}
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}