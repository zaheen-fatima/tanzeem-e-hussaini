package com.tanzeemehussaini.backend.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class DashboardStatsResponse {

    private long videos;
    private long articles;
    private long events;
    private long announcements;
    private long galleryItems;
    private long contactMessages;
}