import { useEffect, useState } from "react";
import {
    getSurahs,
    getSurahWithTranslation,
    getSurahAudio
} from "../../api/quranApi";

export default function Quran() {
    const [surahs, setSurahs] = useState([]);
    const [selected, setSelected] = useState(null);
    const [audioData, setAudioData] = useState(null);

    useEffect(() => {
        const loadSurahs = async () => {
            const data = await getSurahs();
            setSurahs(data.data || []);
        };

        loadSurahs();
    }, []);

    const openSurah = async (number) => {
        const data = await getSurahWithTranslation(number);
        const audio = await getSurahAudio(number);

        setSelected(data.data || []);
        setAudioData(audio.data || null);

        setTimeout(() => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }, 100);
    };

    return (
        <main className="public-page">
            <h1>Holy Quran</h1>

            <div className="quran-layout">
                <aside className="surah-list">
                    {surahs.map((surah) => (
                        <button
                            key={surah.number}
                            onClick={() => openSurah(surah.number)}
                        >
                            {surah.number}. {surah.englishName}
                        </button>
                    ))}
                </aside>

                <section className="surah-content">
                    {!selected && <p>Select a Surah to read</p>}

                    {selected && selected.length >= 2 && (
                        <>
                            <h2>{selected[0].englishName}</h2>

                            {selected[0].ayahs.map((ayah, index) => (
                                <div className="ayah-card" key={ayah.number}>
                                    <p className="arabic-text">{ayah.text}</p>

                                    <p className="translation-text">
                                        {selected[1].ayahs[index]?.text}
                                    </p>

                                    {audioData?.ayahs?.[index]?.audio && (
                                        <audio controls src={audioData.ayahs[index].audio} />
                                    )}
                                </div>
                            ))}
                        </>
                    )}
                </section>
            </div>
        </main>
    );
}