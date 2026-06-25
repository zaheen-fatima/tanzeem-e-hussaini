package com.tanzeemehussaini.backend.controller;

import com.tanzeemehussaini.backend.service.QuranService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/quran")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class QuranController {

    private final QuranService quranService;

    @GetMapping("/surahs")
    public String getAllSurahs() {
        return quranService.getAllSurahs();
    }

    @GetMapping("/surah/{number}/audio")
    public String getSurahAudio(@PathVariable int number) {
        return quranService.getSurahAudio(number);
    }

    @GetMapping("/surah/{number}")
    public String getSurah(@PathVariable int number) {
        return quranService.getSurah(number);
    }

    @GetMapping("/surah/{number}/translation")
    public String getSurahWithTranslation(@PathVariable int number) {
        return quranService.getSurahWithTranslation(number);
    }

    @GetMapping("/juz/{number}")
    public String getJuz(@PathVariable int number) {
        return quranService.getJuz(number);
    }
}