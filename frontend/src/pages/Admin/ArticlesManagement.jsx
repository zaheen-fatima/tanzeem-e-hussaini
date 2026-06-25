import { useEffect, useState } from "react";
import {
    getArticles,
    addArticle,
    updateArticle,
    deleteArticle
} from "../../api/articleApi";
import { uploadImageFile } from "../../api/uploadApi";
import Pagination from "../../components/common/Pagination.jsx";

const categories = [
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

const emptyForm = {
    title: "",
    shortDescription: "",
    content: "",
    author: "Tanzeem-e-Hussaini",
    coverImageUrl: "",
    category: "",
    published: true
};

export default function ArticlesManagement() {
    const [articles, setArticles] = useState([]);
    const [pageData, setPageData] = useState(null);
    const [page, setPage] = useState(0);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState(emptyForm);
    const [uploading, setUploading] = useState(false);

    const fetchArticles = async () => {
        const data = await getArticles(page, 5);
        setArticles(data.content || []);
        setPageData(data);
    };

    useEffect(() => {
        fetchArticles();
    }, [page]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleCoverUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);

        try {
            const uploadedUrl = await uploadImageFile(file);
            setForm((prev) => ({
                ...prev,
                coverImageUrl: uploadedUrl
            }));
        } finally {
            setUploading(false);
        }
    };

    const resetForm = () => {
        setEditId(null);
        setForm(emptyForm);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editId) {
            await updateArticle(editId, form);
        } else {
            await addArticle(form);
        }

        resetForm();
        fetchArticles();
    };

    const handleEdit = (article) => {
        setEditId(article.id);

        setForm({
            title: article.title || "",
            shortDescription: article.shortDescription || "",
            content: article.content || "",
            author: article.author || "Tanzeem-e-Hussaini",
            coverImageUrl: article.coverImageUrl || "",
            category: article.category || "",
            published: article.published ?? true
        });
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this article?")) return;
        await deleteArticle(id);
        fetchArticles();
    };

    return (
        <section className="admin-page">
            <h1>Articles Management</h1>

            <section className="admin-grid">
                <form className="admin-form" onSubmit={handleSubmit}>
                    <h2>{editId ? "Edit Article" : "Add Article"}</h2>

                    <input
                        name="title"
                        placeholder="Article Title"
                        value={form.title}
                        onChange={handleChange}
                    />

                    <textarea
                        name="shortDescription"
                        placeholder="Short Description"
                        value={form.shortDescription}
                        onChange={handleChange}
                    />

                    <textarea
                        name="content"
                        placeholder="Full Article Content"
                        value={form.content}
                        onChange={handleChange}
                    />

                    <input
                        name="author"
                        placeholder="Author"
                        value={form.author}
                        onChange={handleChange}
                    />

                    <input
                        name="coverImageUrl"
                        placeholder="Cover Image URL"
                        value={form.coverImageUrl}
                        onChange={handleChange}
                    />

                    <div className="upload-placeholder">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleCoverUpload}
                        />

                        {uploading && <small>Uploading cover image...</small>}
                        {form.coverImageUrl && <small>Cover image ready.</small>}
                    </div>

                    <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                    >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                            <option key={category} value={category}>
                                {category}
                            </option>
                        ))}
                    </select>

                    <label className="checkbox-row">
                        <input
                            type="checkbox"
                            name="published"
                            checked={form.published}
                            onChange={handleChange}
                        />
                        Published
                    </label>

                    <button type="submit">
                        {editId ? "Update Article" : "Add Article"}
                    </button>

                    {editId && (
                        <button type="button" className="cancel-btn" onClick={resetForm}>
                            Cancel Edit
                        </button>
                    )}
                </form>

                <section className="admin-table">
                    <h2>Articles</h2>

                    <table>
                        <thead>
                        <tr>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Author</th>
                            <th>Published</th>
                            <th>Action</th>
                        </tr>
                        </thead>

                        <tbody>
                        {articles.map((article) => (
                            <tr key={article.id}>
                                <td>{article.title}</td>
                                <td>{article.category}</td>
                                <td>{article.author}</td>
                                <td>{article.published ? "Yes" : "No"}</td>
                                <td>
                                    <button className="edit-btn" onClick={() => handleEdit(article)}>
                                        Edit
                                    </button>

                                    <button className="danger-btn" onClick={() => handleDelete(article.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <Pagination pageData={pageData} page={page} setPage={setPage} />
                </section>
            </section>
        </section>
    );
}
