import { useEffect, useState } from "react";
import {
    getAnnouncements,
    addAnnouncement,
    updateAnnouncement,
    deleteAnnouncement
} from "../../api/announcementApi";
import Pagination from "../../components/common/Pagination.jsx";

export default function AnnouncementsManagement() {
    const [announcements, setAnnouncements] = useState([]);
    const [pageData, setPageData] = useState(null);
    const [page, setPage] = useState(0);
    const [editId, setEditId] = useState(null);

    const [form, setForm] = useState({
        title: "",
        message: "",
        priority: "NORMAL",
        expiryDate: "",
        active: true
    });

    const fetchAnnouncements = async () => {
        const data = await getAnnouncements(page, 5);
        setAnnouncements(data.content || []);
        setPageData(data);
    };

    useEffect(() => {
        fetchAnnouncements();
    }, [page]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const resetForm = () => {
        setEditId(null);
        setForm({
            title: "",
            message: "",
            priority: "NORMAL",
            expiryDate: "",
            active: true
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editId) {
            await updateAnnouncement(editId, form);
        } else {
            await addAnnouncement(form);
        }

        resetForm();
        fetchAnnouncements();
    };

    const handleEdit = (item) => {
        setEditId(item.id);

        setForm({
            title: item.title || "",
            message: item.message || "",
            priority: item.priority || "NORMAL",
            expiryDate: item.expiryDate || "",
            active: item.active ?? true
        });
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this announcement?")) return;

        await deleteAnnouncement(id);
        fetchAnnouncements();
    };

    return (
        <section className="admin-page">
            <h1>Announcements Management</h1>

            <section className="admin-grid">
                <form className="admin-form" onSubmit={handleSubmit}>
                    <h2>{editId ? "Edit Announcement" : "Add Announcement"}</h2>

                    <input name="title" placeholder="Title" value={form.title} onChange={handleChange} />

                    <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} />

                    <select name="priority" value={form.priority} onChange={handleChange}>
                        <option value="NORMAL">Normal</option>
                        <option value="HIGH">High</option>
                        <option value="URGENT">Urgent</option>
                    </select>

                    <input type="date" name="expiryDate" value={form.expiryDate} onChange={handleChange} />

                    <label className="checkbox-row">
                        <input type="checkbox" name="active" checked={form.active} onChange={handleChange} />
                        Active
                    </label>

                    <button type="submit">
                        {editId ? "Update Announcement" : "Add Announcement"}
                    </button>

                    {editId && (
                        <button type="button" className="cancel-btn" onClick={resetForm}>
                            Cancel Edit
                        </button>
                    )}
                </form>

                <section className="admin-table">
                    <h2>Announcements</h2>

                    <table>
                        <thead>
                        <tr>
                            <th>Title</th>
                            <th>Priority</th>
                            <th>Expiry</th>
                            <th>Active</th>
                            <th>Action</th>
                        </tr>
                        </thead>

                        <tbody>
                        {announcements.map((item) => (
                            <tr key={item.id}>
                                <td>{item.title}</td>
                                <td>{item.priority}</td>
                                <td>{item.expiryDate}</td>
                                <td>{item.active ? "Yes" : "No"}</td>
                                <td>
                                    <button className="edit-btn" onClick={() => handleEdit(item)}>
                                        Edit
                                    </button>

                                    <button className="danger-btn" onClick={() => handleDelete(item.id)}>
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