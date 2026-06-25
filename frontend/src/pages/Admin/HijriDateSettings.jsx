import { useEffect, useState } from "react";
import api from "../../api/axiosConfig";

export default function HijriDateSettings() {

    const [hijriDate, setHijriDate] = useState("");
    const [manualOverride, setManualOverride] = useState(false);
    const [saving, setSaving] = useState(false);
    const [baseGregorianDate, setBaseGregorianDate] = useState("");

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = async () => {
        const response = await api.get(
            "/admin/settings/hijri-date"
        );

        setHijriDate(response.data.hijriDate || "");
        setManualOverride(response.data.manualOverride || false);
        setBaseGregorianDate(response.data.baseGregorianDate || "");
    };

    const handleSave = async () => {

        setSaving(true);

        try {

            await api.put(
                "/admin/settings/hijri-date",
                {
                    hijriDate,
                    manualOverride,
                    baseGregorianDate
                }
            );

            alert("Hijri date updated successfully");

        } finally {
            setSaving(false);
        }
    };

    return (
        <section className="admin-page">

            <h1>Hijri Date Settings</h1>

            <div className="admin-form">

                <label>
                    <input
                        type="checkbox"
                        checked={manualOverride}
                        onChange={(e) =>
                            setManualOverride(
                                e.target.checked
                            )
                        }
                    />

                    Use Manual Hijri Date
                </label>

                <input
                    type="text"
                    placeholder="1 Muharram 1448 AH"
                    value={hijriDate}
                    onChange={(e) =>
                        setHijriDate(
                            e.target.value
                        )
                    }
                />
                <input
                    type="date"
                    value={baseGregorianDate}
                    onChange={(e) => setBaseGregorianDate(e.target.value)}
                />

                <small className="form-hint">
                    Select the Gregorian date on which this Hijri date started.
                </small>

                <button
                    onClick={handleSave}
                    disabled={saving}
                >
                    {saving ? "Saving..." : "Save"}
                </button>

            </div>

        </section>
    );
}