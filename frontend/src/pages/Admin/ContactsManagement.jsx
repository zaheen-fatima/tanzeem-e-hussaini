import { useEffect, useState } from "react";

import {
    getContacts,
    replyToContact,
    deleteContact
}
    from "../../api/contactApi";
import Pagination from "../../components/common/Pagination.jsx";

export default function ContactsManagement() {

    const [contacts, setContacts] =
        useState([]);

    const [pageData, setPageData] =
        useState(null);

    const [page, setPage] =
        useState(0);

    const [replyText, setReplyText] =
        useState("");

    const [selectedId, setSelectedId] =
        useState(null);

    const [selectedContact, setSelectedContact] = useState(null);

    const fetchContacts = async () => {

        const data =
            await getContacts(
                page,
                5
            );

        setContacts(
            data.content || []
        );

        setPageData(data);
    };

    useEffect(() => {

        fetchContacts();

    }, [page]);

    const handleReply = async () => {

        if (
            !selectedId ||
            !replyText.trim()
        ) return;

        await replyToContact(
            selectedId,
            {
                reply: replyText
            }
        );

        setReplyText("");
        setSelectedId(null);

        fetchContacts();
    };

    const handleDelete = async (
        id
    ) => {

        if (
            !window.confirm(
                "Delete this contact?"
            )
        ) return;

        await deleteContact(id);

        fetchContacts();
    };

    return (
        <section className="admin-page">

            <h1>
                Contact Messages
            </h1>

            <section className="admin-table">

                <table>

                    <thead>

                    <tr>

                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Status</th>
                        <th>Action</th>

                    </tr>

                    </thead>

                    <tbody>

                    {
                        contacts.map(contact => (

                            <tr
                                key={contact.id}
                            >

                                <td>
                                    {contact.name}
                                </td>

                                <td>
                                    {contact.email}
                                </td>

                                <td>
                                    {contact.phone}
                                </td>

                                <td>
                                    {contact.status}
                                </td>

                                <td>

                                    <button
                                        className="edit-btn"
                                        onClick={() => {
                                            setSelectedId(contact.id);
                                            setSelectedContact(contact);
                                        }}
                                    >
                                        Reply
                                    </button>

                                    <button
                                        className="danger-btn"
                                        onClick={() =>
                                            handleDelete(
                                                contact.id
                                            )
                                        }
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>
                        ))
                    }

                    </tbody>

                </table>

            </section>

            {
                selectedId && (

                    <section
                        className="admin-form"
                    >

                        <h2>
                            Reply Message
                        </h2>

                        <textarea
                            value={replyText}
                            onChange={(e) =>
                                setReplyText(
                                    e.target.value
                                )
                            }
                            placeholder="Type reply..."
                        />

                        <div className="reply-actions">

                            <a
                                className="edit-btn"
                                href={`mailto:${selectedContact?.email}?subject=Reply from Tanzeem-e-Hussaini&body=${encodeURIComponent(replyText)}`}
                            >
                                Email Reply
                            </a>

                            <a
                                className="edit-btn"
                                target="_blank"
                                rel="noreferrer"
                                href={`https://wa.me/91${selectedContact?.phone}?text=${encodeURIComponent(replyText)}`}
                            >
                                WhatsApp Reply
                            </a>

                        </div>

                        <button
                            onClick={handleReply}
                        >
                            REPLIED?
                        </button>

                    </section>
                )
            }

            <Pagination
                pageData={pageData}
                page={page}
                setPage={setPage}
            />

        </section>
    );
}