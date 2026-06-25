package com.tanzeemehussaini.backend.repository;

import com.tanzeemehussaini.backend.entity.HijriDateSetting;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HijriDateSettingRepository
        extends JpaRepository<HijriDateSetting, Long> {
}