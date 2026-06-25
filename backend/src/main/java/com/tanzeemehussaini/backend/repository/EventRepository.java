package com.tanzeemehussaini.backend.repository;

import com.tanzeemehussaini.backend.entity.Event;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;

public interface EventRepository
        extends JpaRepository<Event, Long> {

    Page<Event> findByEventDateGreaterThanEqual(
            LocalDate date,
            Pageable pageable
    );

    Page<Event> findByFeaturedTrue(
            Pageable pageable
    );
}