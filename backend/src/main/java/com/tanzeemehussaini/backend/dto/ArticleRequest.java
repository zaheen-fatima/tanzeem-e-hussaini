package com.tanzeemehussaini.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ArticleRequest {

    @NotBlank(message = "Title is required")
    private String title;

    private String shortDescription;

    @NotBlank(message = "Content is required")
    private String content;

    private String author;

    private String coverImageUrl;

    @NotBlank(message = "Category is required")
    private String category;

    private boolean published;
}