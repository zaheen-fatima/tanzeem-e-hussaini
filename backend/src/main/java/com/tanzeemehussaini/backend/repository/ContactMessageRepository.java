package com.tanzeemehussaini.backend.repository;

import com.tanzeemehussaini.backend.entity.ContactMessage;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactMessageRepository
        extends JpaRepository<ContactMessage, Long> {

    Page<ContactMessage> findByStatusIgnoreCase(
            String status,
            Pageable pageable
    );
}