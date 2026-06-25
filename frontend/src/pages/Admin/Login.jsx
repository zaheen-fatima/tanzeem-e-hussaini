import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../../api/authApi";

export default function Login() {
    const navigate = useNavigate();

    const [form, setForm] = useState({
        username: "",
        password: ""
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const data = await loginAdmin(form);

            localStorage.setItem("token", data.token);

            navigate("/admin");
        } catch {
            setError("Invalid username or password");
        }
    };

    return (
        <main className="login-page">
            <form className="login-card" onSubmit={handleLogin}>
                <h1>Admin Login</h1>
                <p>Tanzeem-e-Hussaini Portal</p>

                {error && <div className="error-box">{error}</div>}

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={form.username}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                />

                <button type="submit">Login</button>
            </form>
        </main>
    );
}