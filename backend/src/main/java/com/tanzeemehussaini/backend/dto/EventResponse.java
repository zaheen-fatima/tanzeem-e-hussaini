package com.tanzeemehussaini.backend.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Getter
@Builder
public class EventResponse {

    private Long id;
    private String title;
    private String description;
    private LocalDate eventDate;
    private LocalTime startTime;
    private String location;
    private String khitabatBy;
    private String bannerImageUrl;
    private boolean featured;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}