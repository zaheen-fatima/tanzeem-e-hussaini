package com.tanzeemehussaini.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class QuranService {

    private final RestClient restClient;

    public QuranService() {
        this.restClient = RestClient.create();
    }

    public String getAllSurahs() {
        return restClient.get()
                .uri("https://api.alquran.cloud/v1/surah")
                .retrieve()
                .body(String.class);
    }

    public String getSurah(int number) {
        return restClient.get()
                .uri("https://api.alquran.cloud/v1/surah/" + number + "/quran-uthmani")
                .retrieve()
                .body(String.class);
    }

    public String getSurahWithTranslation(int number) {
        return restClient.get()
                .uri("https://api.alquran.cloud/v1/surah/" + number + "/editions/quran-uthmani,en.asad")
                .retrieve()
                .body(String.class);
    }

    public String getJuz(int number) {
        return restClient.get()
                .uri("https://api.alquran.cloud/v1/juz/" + number + "/quran-uthmani")
                .retrieve()
                .body(String.class);
    }
    public String getSurahAudio(int number) {
        return restClient.get()
                .uri("https://api.alquran.cloud/v1/surah/" + number + "/ar.alafasy")
                .retrieve()
                .body(String.class);
    }
}