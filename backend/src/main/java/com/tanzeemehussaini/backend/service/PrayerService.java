package com.tanzeemehussaini.backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tanzeemehussaini.backend.dto.PrayerTimeResponse;
import com.tanzeemehussaini.backend.repository.HijriDateSettingRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import com.tanzeemehussaini.backend.entity.HijriDateSetting;

@Service
public class PrayerService {

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;
    private final HijriDateSettingRepository hijriDateSettingRepository;

    public PrayerService(ObjectMapper objectMapper,
                         HijriDateSettingRepository hijriDateSettingRepository) {
        this.restTemplate = new RestTemplate();
        this.objectMapper = objectMapper;
        this.hijriDateSettingRepository = hijriDateSettingRepository;
    }

    public PrayerTimeResponse getTodayPrayerTimes() {

        try {
            String url =
                    "https://api.aladhan.com/v1/timings"
                            + "?latitude=28.6197"
                            + "&longitude=77.0333"
                            + "&method=0";

            String response = restTemplate.getForObject(url, String.class);

            JsonNode root = objectMapper.readTree(response);

            JsonNode data = root.get("data");
            JsonNode timings = data.get("timings");
            JsonNode hijri = data.get("date").get("hijri");
            JsonNode gregorian = data.get("date").get("gregorian");

            String hijriFullDate =
                    hijri.get("day").asText()
                            + " "
                            + hijri.get("month").get("en").asText()
                            + " "
                            + hijri.get("year").asText()
                            + " AH";
            HijriDateSetting setting =
                    hijriDateSettingRepository
                            .findAll()
                            .stream()
                            .findFirst()
                            .orElse(null);

            if (setting != null
                    && setting.isManualOverride()
                    && setting.getHijriDate() != null
                    && !setting.getHijriDate().isBlank()
                    && setting.getBaseGregorianDate() != null) {

                long daysPassed = java.time.temporal.ChronoUnit.DAYS.between(
                        setting.getBaseGregorianDate(),
                        java.time.LocalDate.now()
                );

                hijriFullDate = incrementHijriDate(
                        setting.getHijriDate(),
                        daysPassed
                );
            }

            String gregorianFullDate =
                    gregorian.get("day").asText()
                            + " "
                            + gregorian.get("month").get("en").asText()
                            + " "
                            + gregorian.get("year").asText();

            return PrayerTimeResponse.builder()
                    .fajr(cleanTime(timings.get("Fajr").asText()))
                    .sunrise(cleanTime(timings.get("Sunrise").asText()))
                    .dhuhr(cleanTime(timings.get("Dhuhr").asText()))
                    .asr(cleanTime(timings.get("Asr").asText()))
                    .maghrib(cleanTime(timings.get("Maghrib").asText()))
                    .isha(cleanTime(timings.get("Isha").asText()))
                    .hijriDate(hijriFullDate)
                    .hijriMonth(hijri.get("month").get("en").asText())
                    .hijriYear(hijri.get("year").asText())
                    .gregorianDate(gregorianFullDate)
                    .day(gregorian.get("weekday").get("en").asText())
                    .city("Dwarka Mor, New Delhi")
                    .country("India")
                    .build();

        } catch (Exception e) {
            throw new RuntimeException("Unable to fetch Shia prayer timings");
        }
    }

    private String cleanTime(String time) {
        if (time == null) return "";
        return time.split(" ")[0];
    }
    private String incrementHijriDate(String baseHijriDate, long daysPassed) {

        if (daysPassed <= 0) {
            return baseHijriDate;
        }

        String[] parts = baseHijriDate.split(" ", 2);

        int day = Integer.parseInt(parts[0]);
        String remainingDate = parts[1];

        return (day + daysPassed) + " " + remainingDate;
    }
}