package com.tanzeemehussaini.backend.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class GalleryResponse {

    private Long id;
    private String title;
    private String imageUrl;
    private String category;
    private String description;
    private LocalDateTime uploadedAt;
}