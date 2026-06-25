package com.tanzeemehussaini.backend.repository;

import com.tanzeemehussaini.backend.entity.Article;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ArticleRepository
        extends JpaRepository<Article, Long> {

    Optional<Article> findBySlug(String slug);

    Page<Article> findByTitleContainingIgnoreCase(
            String keyword,
            Pageable pageable
    );

    Page<Article> findByCategoryIgnoreCase(
            String category,
            Pageable pageable
    );
}