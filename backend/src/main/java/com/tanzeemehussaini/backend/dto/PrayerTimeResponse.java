package com.tanzeemehussaini.backend.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class PrayerTimeResponse {

    private String fajr;
    private String sunrise;
    private String dhuhr;
    private String asr;
    private String maghrib;
    private String isha;

    private String hijriDate;
    private String hijriMonth;
    private String hijriYear;

    private String gregorianDate;
    private String day;

    private String city;
    private String country;
}