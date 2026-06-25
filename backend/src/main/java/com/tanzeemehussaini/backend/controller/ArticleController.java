package com.tanzeemehussaini.backend.controller;

import com.tanzeemehussaini.backend.dto.ArticleRequest;
import com.tanzeemehussaini.backend.dto.ArticleResponse;
import com.tanzeemehussaini.backend.dto.PageResponse;
import com.tanzeemehussaini.backend.service.ArticleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/articles")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ArticleController {

    private final ArticleService articleService;

    private <T> PageResponse<T> buildPageResponse(
            Page<T> pageResult) {

        return PageResponse.<T>builder()
                .content(pageResult.getContent())
                .page(pageResult.getNumber())
                .size(pageResult.getSize())
                .totalElements(pageResult.getTotalElements())
                .totalPages(pageResult.getTotalPages())
                .last(pageResult.isLast())
                .build();
    }

    @PostMapping
    public ArticleResponse addArticle(
            @Valid @RequestBody ArticleRequest request) {

        return articleService.addArticle(request);
    }

    @GetMapping
    public PageResponse<ArticleResponse> getAllArticles(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {

        return buildPageResponse(
                articleService.getAllArticles(page, size)
        );
    }

    @GetMapping("/{id}")
    public ArticleResponse getArticleById(
            @PathVariable Long id) {

        return articleService.getArticleById(id);
    }

    @GetMapping("/slug/{slug}")
    public ArticleResponse getArticleBySlug(
            @PathVariable String slug) {

        return articleService.getArticleBySlug(slug);
    }

    @GetMapping("/search")
    public PageResponse<ArticleResponse> searchArticles(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {

        return buildPageResponse(
                articleService.searchArticles(keyword, page, size)
        );
    }

    @GetMapping("/category/{category}")
    public PageResponse<ArticleResponse> getArticlesByCategory(
            @PathVariable String category,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {

        return buildPageResponse(
                articleService.getArticlesByCategory(category, page, size)
        );
    }

    @PutMapping("/{id}")
    public ArticleResponse updateArticle(
            @PathVariable Long id,
            @Valid @RequestBody ArticleRequest request
    ) {

        return articleService.updateArticle(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteArticle(
            @PathVariable Long id) {

        articleService.deleteArticle(id);
    }
}