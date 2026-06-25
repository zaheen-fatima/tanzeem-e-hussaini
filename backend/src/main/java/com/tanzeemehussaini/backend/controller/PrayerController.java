package com.tanzeemehussaini.backend.controller;

import com.tanzeemehussaini.backend.dto.PrayerTimeResponse;
import com.tanzeemehussaini.backend.service.PrayerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/prayer")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class PrayerController {

    private final PrayerService prayerService;

    @GetMapping("/today")
    public PrayerTimeResponse getTodayPrayerTimes() {
        return prayerService.getTodayPrayerTimes();
    }
}