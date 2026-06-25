package com.tanzeemehussaini.backend.repository;

import com.tanzeemehussaini.backend.entity.Video;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VideoRepository
        extends JpaRepository<Video, Long> {

    Page<Video> findByTitleContainingIgnoreCase(
            String title,
            Pageable pageable
    );

    Page<Video> findByCategoryIgnoreCase(
            String category,
            Pageable pageable
    );
}