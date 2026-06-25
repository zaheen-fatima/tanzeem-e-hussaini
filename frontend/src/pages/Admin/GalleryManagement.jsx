import { useEffect, useState } from "react";
import {
    getGalleryItems,
    addGalleryItem,
    updateGalleryItem,
    deleteGalleryItem
} from "../../api/galleryApi";
import { uploadImageFile } from "../../api/uploadApi";
import Pagination from "../../components/common/Pagination.jsx";

const emptyGalleryForm = {
    title: "",
    imageUrl: "",
    category: "",
    description: ""
};

export default function GalleryManagement() {
    const [items, setItems] = useState([]);
    const [pageData, setPageData] = useState(null);
    const [page, setPage] = useState(0);
    const [editId, setEditId] = useState(null);
    const [form, setForm] = useState(emptyGalleryForm);
    const [uploading, setUploading] = useState(false);
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");


    const fetchItems = async () => {
        const data = await getGalleryItems(page, 5);
        setItems(data.content || []);
        setPageData(data);
    };

    useEffect(() => {
        fetchItems();
    }, [page]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const resetForm = () => {
        setEditId(null);
        setForm(emptyGalleryForm);
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);

        try {
            const uploadedUrl = await uploadImageFile(file);

            setForm({
                ...form,
                imageUrl: uploadedUrl
            });
        } finally {
            setUploading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.imageUrl.trim()) {
            alert("Please enter image URL or upload an image.");
            return;
        }

        if (editId) {
            await updateGalleryItem(editId, form);
        } else {
            await addGalleryItem(form);
        }

        resetForm();
        fetchItems();
    };

    const handleEdit = (item) => {
        setEditId(item.id);

        setForm({
            title: item.title || "",
            imageUrl: item.imageUrl || "",
            category: item.category || "",
            description: item.description || ""
        });
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this image?")) return;

        await deleteGalleryItem(id);
        fetchItems();
    };

    const filteredItems = items.filter((item) => {

        const matchesSearch =
            item.title
                ?.toLowerCase()
                .includes(search.toLowerCase());

        const matchesCategory =
            !categoryFilter ||
            item.category === categoryFilter;

        return matchesSearch && matchesCategory;
    });

    return (
        <section className="admin-page">
            <h1>Gallery Management</h1>

            <section className="admin-grid">
                <form className="admin-form" onSubmit={handleSubmit}>
                    <h2>{editId ? "Edit Image" : "Add Image"}</h2>

                    <input
                        name="title"
                        placeholder="Title"
                        value={form.title}
                        onChange={handleChange}
                    />

                    <input
                        name="imageUrl"
                        placeholder="Image URL"
                        value={form.imageUrl}
                        onChange={handleChange}
                    />

                    <small className="form-hint">
                        You can paste image URL or upload from device.
                    </small>

                    <div className="upload-placeholder">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                        />

                        {uploading && <small>Uploading image...</small>}

                        {form.imageUrl && (
                            <small>Image ready to save.</small>
                        )}
                    </div>

                    <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                    >
                        <option value="">Select Category</option>
                        <option value="Muharram">Muharram</option>
                        <option value="Majlis">Majlis</option>
                        <option value="Matam">Matam</option>
                        <option value="Ramzan">Ramzan</option>
                        <option value="Eid">Eid</option>
                        <option value="Quran Programs">Quran Programs</option>
                        <option value="Community Events">Community Events</option>
                        <option value="Youth Programs">Youth Programs</option>
                        <option value="Special Events">Special Events</option>
                        <option value="Niaz / Langar">Niaz / Langar</option>
                        <option value="Miscellaneous">Miscellaneous</option>
                    </select>

                    <textarea
                        name="description"
                        placeholder="Description"
                        value={form.description}
                        onChange={handleChange}
                    />

                    <button type="submit">
                        {editId ? "Update Image" : "Add Image"}
                    </button>

                    {editId && (
                        <button
                            type="button"
                            className="cancel-btn"
                            onClick={resetForm}
                        >
                            Cancel Edit
                        </button>
                    )}
                </form>

                <section className="admin-table">
                    <h2>Gallery</h2>

                    <div className="admin-filters">

                        <input
                            type="text"
                            placeholder="Search images..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                        >
                            <option value="">All Categories</option>

                            <option value="Muharram">Muharram</option>
                            <option value="Majlis">Majlis</option>
                            <option value="Matam">Matam</option>
                            <option value="Ramzan">Ramzan</option>
                            <option value="Eid">Eid</option>
                            <option value="Quran Programs">Quran Programs</option>
                            <option value="Community Events">Community Events</option>
                            <option value="Youth Programs">Youth Programs</option>
                            <option value="Special Events">Special Events</option>
                            <option value="Niaz / Langar">Niaz / Langar</option>
                            <option value="Miscellaneous">Miscellaneous</option>
                        </select>

                    </div>

                    <table>
                        <thead>
                        <tr>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Image</th>
                            <th>Action</th>
                        </tr>
                        </thead>

                        <tbody>
                        {filteredItems.map((item) => (
                            <tr key={item.id}>
                                <td>{item.title}</td>
                                <td>{item.category}</td>
                                <td>
                                    <img
                                        src={item.imageUrl}
                                        alt={item.title}
                                        width="80"
                                        className="admin-thumb"
                                    />
                                </td>
                                <td>
                                    <button
                                        className="edit-btn"
                                        onClick={() => handleEdit(item)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="danger-btn"
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <Pagination
                        pageData={pageData}
                        page={page}
                        setPage={setPage}
                    />
                </section>
            </section>
        </section>
    );
}