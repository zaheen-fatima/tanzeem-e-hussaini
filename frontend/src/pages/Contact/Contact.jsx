import { useState } from "react";
import { submitContactMessage } from "../../api/contactPublicApi";

export default function Contact() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        message: ""
    });

    const [toast, setToast] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        await submitContactMessage(form);

        setToast("Message submitted successfully");

        setForm({
            name: "",
            email: "",
            phone: "",
            message: ""
        });

        setTimeout(() => setToast(""), 2500);
    };

    return (
        <main className="public-page">
            <h1>Contact Us</h1>

            {toast && <div className="success-box">{toast}</div>}

            <form className="contact-form" onSubmit={handleSubmit}>
                <input name="name" placeholder="Your Name" value={form.name} onChange={handleChange} />
                <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <small className="field-hint">
                    Please enter a valid email address. Replies will be sent here.
                </small>

                <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={handleChange}
                    pattern="[0-9]{10}"
                    required
                />

                <small className="field-hint">
                    Enter a valid 10-digit mobile number for WhatsApp contact.
                </small>

                <textarea
                    name="message"
                    placeholder="Your Message"
                    value={form.message}
                    onChange={handleChange}
                />

                <button type="submit">Submit Message</button>
            </form>
        </main>
    );
}