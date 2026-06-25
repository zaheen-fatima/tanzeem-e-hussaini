import { useEffect, useState, useRef } from "react";
import {
    getVideos,
    addVideo,
    updateVideo,
    deleteVideo
} from "../../api/videoApi";
import Pagination from "../../components/common/Pagination.jsx";
import {
    uploadVideoFile,
    uploadImageFile
} from "../../api/uploadApi";

const emptyVideoForm = {
    title: "",
    description: "",
    mediaType: "YOUTUBE",
    youtubeUrl: "",
    thumbnailUrl: "",
    videoFileUrl: "",
    speaker: "",
    category: "",
    eventDate: ""
};

export default function VideosManagement() {
    const [videos, setVideos] = useState([]);
    const [pageData, setPageData] = useState(null);
    const [page, setPage] = useState(0);
    const [editId, setEditId] = useState(null);

    const [form, setForm] = useState(emptyVideoForm);

    const [uploading, setUploading] = useState(false);
    const [uploadingThumbnail, setUploadingThumbnail] = useState(false);

    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("");


    const videoFileRef = useRef(null);
    const thumbnailFileRef = useRef(null);

    const fetchVideos = async () => {
        const data = await getVideos(page, 5);
        setVideos(data.content || []);
        setPageData(data);
    };

    useEffect(() => {
        fetchVideos();
    }, [page]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const resetForm = () => {

        setEditId(null);
        setForm(emptyVideoForm);

        if (videoFileRef.current) {
            videoFileRef.current.value = "";
        }

        if (thumbnailFileRef.current) {
            thumbnailFileRef.current.value = "";
        }
    };

    const handleVideoUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);

        try {
            const uploadedUrl = await uploadVideoFile(file);

            setForm((prev) => ({
                ...prev,
                videoFileUrl: uploadedUrl
            }));
        } catch (error) {
            alert("Video upload failed. Please check backend or Cloudinary.");
        } finally {
            setUploading(false);
        }
    };

    const handleThumbnailUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploadingThumbnail(true);

        try {
            const uploadedUrl = await uploadImageFile(file);

            setForm((prev) => ({
                ...prev,
                thumbnailUrl: uploadedUrl
            }));
        } catch (error) {
            alert("Thumbnail upload failed. Please check backend or Cloudinary.");
        } finally {
            setUploadingThumbnail(false);
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault();

        if (form.mediaType === "YOUTUBE" && !form.youtubeUrl.trim()) {
            alert("Please enter a YouTube URL.");
            return;
        }

        if (form.mediaType === "UPLOAD" && !form.videoFileUrl.trim()) {
            alert("Please upload a video file first.");
            return;
        }

        if (editId) {
            await updateVideo(editId, form);
        } else {
            await addVideo(form);
        }

        resetForm();
        fetchVideos();
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this video?")) return;

        await deleteVideo(id);
        fetchVideos();
    };

    const handleEdit = (video) => {
        setEditId(video.id);

        setForm({
            title: video.title || "",
            description: video.description || "",
            mediaType: video.mediaType || "YOUTUBE",
            youtubeUrl: video.youtubeUrl || "",
            thumbnailUrl: video.thumbnailUrl || "",
            videoFileUrl: video.videoFileUrl || "",
            speaker: video.speaker || "",
            category: video.category || "",
            eventDate: video.eventDate || ""
        });
    };

    const filteredVideos = videos.filter((video) => {
        const matchesSearch =
            video.title
                ?.toLowerCase()
                .includes(search.toLowerCase());

        const matchesCategory =
            !categoryFilter ||
            video.category === categoryFilter;

        return matchesSearch && matchesCategory;
    });

    return (
        <main className="admin-page">
            <h1>Videos Management</h1>

            <section className="admin-grid">
                <form className="admin-form" onSubmit={handleAdd}>
                    <h2>{editId ? "Edit Video" : "Add Video"}</h2>

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

                    <select
                        name="mediaType"
                        value={form.mediaType}
                        onChange={handleChange}
                    >
                        <option value="YOUTUBE">YouTube URL</option>
                        <option value="UPLOAD">Upload from Device</option>
                    </select>

                    {form.mediaType === "YOUTUBE" && (
                        <>
                            <input
                                name="youtubeUrl"
                                placeholder="YouTube URL"
                                value={form.youtubeUrl}
                                onChange={handleChange}
                            />

                            <small className="form-hint">
                                Thumbnail will be generated automatically if possible.
                                If not, paste thumbnail URL below or upload thumbnail from device.
                            </small>
                        </>
                    )}

                    {form.mediaType === "UPLOAD" && (
                        <div className="upload-placeholder">
                            <label className="upload-label">Upload Video</label>

                            <input
                                ref={videoFileRef}
                                type="file"
                                accept="video/*"
                                onChange={handleVideoUpload}
                            />

                            {uploading && <small>Uploading video...</small>}

                            {form.videoFileUrl && (
                                <small>Video uploaded successfully.</small>
                            )}
                        </div>
                    )}

                    <input
                        name="thumbnailUrl"
                        placeholder="Thumbnail Image URL"
                        value={form.thumbnailUrl}
                        onChange={handleChange}
                    />

                    <small className="form-hint">
                        Optional: paste thumbnail image URL or upload from device.
                    </small>

                    <div className="upload-placeholder">
                        <label className="upload-label">Upload Thumbnail</label>

                        <input
                            ref={thumbnailFileRef}
                            type="file"
                            accept="image/*"
                            onChange={handleThumbnailUpload}
                        />

                        {uploadingThumbnail && (
                            <small>Uploading thumbnail...</small>
                        )}

                        {form.thumbnailUrl && (
                            <small>Thumbnail ready.</small>
                        )}
                    </div>

                    <input
                        name="speaker"
                        placeholder="Speaker"
                        value={form.speaker}
                        onChange={handleChange}
                    />

                    <select
                        name="category"
                        value={form.category}
                        onChange={handleChange}
                    >
                        <option value="">Select Category</option>
                        <option value="Majlis">Majlis</option>
                        <option value="Matam">Matam</option>
                        <option value="Mehfil">Mehfil</option>
                        <option value="Noha">Noha</option>
                        <option value="Quran">Quran</option>
                        <option value="Muharram">Muharram</option>
                        <option value="Ramzan">Ramzan</option>
                        <option value="Special Event">Special Event</option>
                        <option value="Miscellaneous">Miscellaneous</option>
                    </select>

                    <input
                        type="date"
                        name="eventDate"
                        value={form.eventDate}
                        onChange={handleChange}
                    />

                    <button type="submit">
                        {editId ? "Update Video" : "Add Video"}
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
                    <h2>Videos</h2>

                    <div className="admin-filters">
                        <input
                            type="text"
                            placeholder="Search videos..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />

                        <select
                            value={categoryFilter}
                            onChange={(e) => setCategoryFilter(e.target.value)}
                        >
                            <option value="">All Categories</option>
                            <option value="Majlis">Majlis</option>
                            <option value="Matam">Matam</option>
                            <option value="Mehfil">Mehfil</option>
                            <option value="Noha">Noha</option>
                            <option value="Quran">Quran</option>
                            <option value="Muharram">Muharram</option>
                            <option value="Ramzan">Ramzan</option>
                            <option value="Special Event">Special Event</option>
                            <option value="Miscellaneous">Miscellaneous</option>
                        </select>
                    </div>

                    <table>
                        <thead>
                        <tr>
                            <th>Thumbnail</th>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Category</th>
                            <th>Speaker</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                        </thead>

                        <tbody>
                        {filteredVideos.map((video) => (
                            <tr key={video.id}>
                                <td>
                                    {video.thumbnailUrl && (
                                        <img
                                            src={video.thumbnailUrl}
                                            alt={video.title}
                                            className="admin-thumb"
                                        />
                                    )}
                                </td>
                                <td>{video.title}</td>
                                <td>{video.mediaType || "YOUTUBE"}</td>
                                <td>{video.category}</td>
                                <td>{video.speaker}</td>
                                <td>{video.eventDate}</td>
                                <td>
                                    <button
                                        className="edit-btn"
                                        onClick={() => handleEdit(video)}
                                    >
                                        Edit
                                    </button>

                                    <button
                                        className="danger-btn"
                                        onClick={() => handleDelete(video.id)}
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
        </main>
    );
}