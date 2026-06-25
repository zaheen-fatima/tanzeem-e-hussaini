package com.tanzeemehussaini.backend.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class ArticleResponse {

    private Long id;
    private String title;
    private String slug;
    private String content;
    private String shortDescription;
    private String author;
    private String coverImageUrl;
    private String category;
    private boolean published;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}