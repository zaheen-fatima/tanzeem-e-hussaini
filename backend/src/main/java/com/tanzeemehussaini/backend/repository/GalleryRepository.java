package com.tanzeemehussaini.backend.repository;

import com.tanzeemehussaini.backend.entity.GalleryItem;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GalleryRepository
        extends JpaRepository<GalleryItem, Long> {

    Page<GalleryItem> findByCategoryIgnoreCase(
            String category,
            Pageable pageable
    );
}