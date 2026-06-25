package com.tanzeemehussaini.backend.service;

import com.tanzeemehussaini.backend.dto.ArticleRequest;
import com.tanzeemehussaini.backend.dto.ArticleResponse;
import com.tanzeemehussaini.backend.entity.Article;
import com.tanzeemehussaini.backend.exception.ResourceNotFoundException;
import com.tanzeemehussaini.backend.repository.ArticleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ArticleService {

    private final ArticleRepository articleRepository;

    public ArticleResponse addArticle(ArticleRequest request) {

        Article article = Article.builder()
                .title(request.getTitle())
                .shortDescription(request.getShortDescription())
                .content(request.getContent())
                .author(request.getAuthor())
                .coverImageUrl(request.getCoverImageUrl())
                .category(request.getCategory())
                .published(request.isPublished())
                .build();

        return mapToResponse(articleRepository.save(article));
    }

    public Page<ArticleResponse> getAllArticles(int page, int size) {

        Pageable pageable = createPageable(page, size);

        return articleRepository.findAll(pageable)
                .map(this::mapToResponse);
    }

    public ArticleResponse getArticleById(Long id) {

        Article article = articleRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Article not found"));

        return mapToResponse(article);
    }

    public ArticleResponse getArticleBySlug(String slug) {

        Article article = articleRepository.findBySlug(slug)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Article not found"));

        return mapToResponse(article);
    }

    public Page<ArticleResponse> searchArticles(
            String keyword,
            int page,
            int size
    ) {

        Pageable pageable = createPageable(page, size);

        return articleRepository
                .findByTitleContainingIgnoreCase(keyword, pageable)
                .map(this::mapToResponse);
    }

    public Page<ArticleResponse> getArticlesByCategory(
            String category,
            int page,
            int size
    ) {

        Pageable pageable = createPageable(page, size);

        return articleRepository
                .findByCategoryIgnoreCase(category, pageable)
                .map(this::mapToResponse);
    }

    public ArticleResponse updateArticle(
            Long id,
            ArticleRequest request
    ) {

        Article article = articleRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Article not found"));

        article.setTitle(request.getTitle());
        article.setShortDescription(request.getShortDescription());
        article.setContent(request.getContent());
        article.setAuthor(request.getAuthor());
        article.setCoverImageUrl(request.getCoverImageUrl());
        article.setCategory(request.getCategory());
        article.setPublished(request.isPublished());

        return mapToResponse(articleRepository.save(article));
    }

    public void deleteArticle(Long id) {

        if (!articleRepository.existsById(id)) {
            throw new ResourceNotFoundException("Article not found");
        }

        articleRepository.deleteById(id);
    }

    private Pageable createPageable(int page, int size) {
        return PageRequest.of(
                page,
                size,
                Sort.by("createdAt").descending()
        );
    }

    private ArticleResponse mapToResponse(Article article) {

        return ArticleResponse.builder()
                .id(article.getId())
                .title(article.getTitle())
                .shortDescription(article.getShortDescription())
                .slug(article.getSlug())
                .content(article.getContent())
                .author(article.getAuthor())
                .coverImageUrl(article.getCoverImageUrl())
                .category(article.getCategory())
                .published(article.isPublished())
                .createdAt(article.getCreatedAt())
                .updatedAt(article.getUpdatedAt())
                .build();
    }
}