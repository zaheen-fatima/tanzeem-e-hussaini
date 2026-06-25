package com.tanzeemehussaini.backend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class VideoRequest {

    @NotBlank(message = "Title is required")
    private String title;

    private String description;

    private String youtubeUrl;

    private String thumbnailUrl;

    private String speaker;

    @NotBlank(message = "Category is required")
    private String category;

    private LocalDate eventDate;

    private String mediaType;

    private String videoFileUrl;
}