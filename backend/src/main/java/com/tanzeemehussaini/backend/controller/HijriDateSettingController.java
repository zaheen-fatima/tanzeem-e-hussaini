package com.tanzeemehussaini.backend.controller;

import com.tanzeemehussaini.backend.entity.HijriDateSetting;
import com.tanzeemehussaini.backend.repository.HijriDateSettingRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/settings/hijri-date")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class HijriDateSettingController {

    private final HijriDateSettingRepository repository;

    @GetMapping
    public HijriDateSetting getSetting() {
        return repository.findAll()
                .stream()
                .findFirst()
                .orElseGet(() ->
                        repository.save(
                                HijriDateSetting.builder()
                                        .hijriDate("")
                                        .manualOverride(false)
                                        .build()
                        )
                );
    }

    @PutMapping
    public HijriDateSetting updateSetting(
            @RequestBody HijriDateSetting request
    ) {
        HijriDateSetting setting = repository.findAll()
                .stream()
                .findFirst()
                .orElseGet(() ->
                        HijriDateSetting.builder()
                                .hijriDate("")
                                .manualOverride(false)
                                .build()
                );

        setting.setHijriDate(request.getHijriDate());
        setting.setManualOverride(request.isManualOverride());
        setting.setBaseGregorianDate(request.getBaseGregorianDate());
        return repository.save(setting);
    }
}