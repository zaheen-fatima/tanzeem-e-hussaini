import { useEffect, useState } from "react";
import {
    getEvents,
    addEvent,
    updateEvent,
    deleteEvent
} from "../../api/eventApi";

import { uploadImageFile } from "../../api/uploadApi";
import Pagination from "../../components/common/Pagination.jsx";

export default function EventsManagement() {
    const [events, setEvents] = useState([]);
    const [pageData, setPageData] = useState(null);
    const [page, setPage] = useState(0);
    const [editId, setEditId] = useState(null);
    const [uploadingBanner, setUploadingBanner] = useState(false);
    const [form, setForm] = useState({
        title: "",
        description: "",
        khitabatBy: "",
        eventDate: "",
        startTime: "",
        location: "",
        bannerImageUrl: "",
        featured: false
    });

    const fetchEvents = async () => {
        const data = await getEvents(page, 5);
        setEvents(data.content || []);
        setPageData(data);
    };

    useEffect(() => {
        fetchEvents();
    }, [page]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value
        });
    };

    const handleBannerUpload = async (e) => {

        const file = e.target.files[0];

        if (!file) return;

        setUploadingBanner(true);

        try {

            const uploadedUrl =
                await uploadImageFile(file);

            setForm({
                ...form,
                bannerImageUrl: uploadedUrl
            });

        } finally {

            setUploadingBanner(false);
        }
    };

    const resetForm = () => {
        setEditId(null);
        setForm({
            title: "",
            description: "",
            khitabatBy: "",
            eventDate: "",
            startTime: "",
            location: "",
            bannerImageUrl: "",
            featured: false
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editId) {
            await updateEvent(editId, form);
        } else {
            await addEvent(form);
        }

        resetForm();
        fetchEvents();
    };

    const handleEdit = (event) => {
        setEditId(event.id);

        setForm({
            title: event.title || "",
            description: event.description || "",
            khitabatBy: event.khitabatBy || "",
            eventDate: event.eventDate || "",
            startTime: event.startTime || "",
            location: event.location || "",
            bannerImageUrl: event.bannerImageUrl || "",
            featured: event.featured || false
        });
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this event?")) return;

        await deleteEvent(id);
        fetchEvents();
    };

    return (
        <section className="admin-page">
            <h1>Events Management</h1>

            <section className="admin-grid">
                <form className="admin-form" onSubmit={handleSubmit}>
                    <h2>{editId ? "Edit Event" : "Add Event"}</h2>

                    <input
                        name="title"
                        placeholder="Title"
                        value={form.title}
                        onChange={handleChange}
                    />

                    <textarea
                        name="description"
                        placeholder="Description"
                        value={form.description}
                        onChange={handleChange}
                    />

                    <input
                        name="khitabatBy"
                        placeholder="Khitabat By"
                        value={form.khitabatBy}
                        onChange={handleChange}
                    />

                    <input
                        type="date"
                        name="eventDate"
                        value={form.eventDate}
                        onChange={handleChange}
                    />

                    <input
                        type="time"
                        name="startTime"
                        value={form.startTime}
                        onChange={handleChange}
                    />

                    <input
                        name="location"
                        placeholder="Location"
                        value={form.location}
                        onChange={handleChange}
                    />

                    <input
                        name="bannerImageUrl"
                        placeholder="Banner Image URL"
                        value={form.bannerImageUrl}
                        onChange={handleChange}
                    />

                    <small className="form-hint">
                        Paste image URL or upload from device.
                    </small>

                    <div className="upload-placeholder">

                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleBannerUpload}
                        />

                        {uploadingBanner && (
                            <small>Uploading banner...</small>
                        )}

                        {form.bannerImageUrl && (
                            <small>Banner image ready.</small>
                        )}

                    </div>

                    <label className="checkbox-row">
                        <input
                            type="checkbox"
                            name="featured"
                            checked={form.featured}
                            onChange={handleChange}
                        />
                        Featured Event
                    </label>

                    <button type="submit">
                        {editId ? "Update Event" : "Add Event"}
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
                    <h2>Events</h2>

                    <table>
                        <thead>
                        <tr>

                            <th>Title</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Location</th>
                            <th>Featured</th>
                            <th>Action</th>
                        </tr>
                        </thead>

                        <tbody>
                        {events.map((event) => (
                            <tr key={event.id}>



                                <td>{event.title}</td>
                                <td>{event.eventDate}</td>
                                <td>{event.startTime}</td>
                                <td>{event.location}</td>
                                <td>{event.featured ? "Yes" : "No"}</td>
                                <td>
                                    <button
                                        className="edit-btn"
                                        onClick={() => handleEdit(event)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="danger-btn"
                                        onClick={() => handleDelete(event.id)}
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