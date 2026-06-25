package com.tanzeemehussaini.backend.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Builder
public class VideoResponse {

    private Long id;

    private String title;

    private String description;

    private String youtubeUrl;

    private String thumbnailUrl;

    private String speaker;

    private String category;

    private LocalDate eventDate;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private String mediaType;

    private String videoFileUrl;
}