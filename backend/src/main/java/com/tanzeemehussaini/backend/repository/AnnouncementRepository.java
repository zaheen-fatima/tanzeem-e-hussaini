package com.tanzeemehussaini.backend.repository;

import com.tanzeemehussaini.backend.entity.Announcement;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnnouncementRepository
        extends JpaRepository<Announcement, Long> {

    Page<Announcement> findByActiveTrue(Pageable pageable);
}