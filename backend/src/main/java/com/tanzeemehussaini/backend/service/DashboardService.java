package com.tanzeemehussaini.backend.service;

import com.tanzeemehussaini.backend.dto.DashboardStatsResponse;
import com.tanzeemehussaini.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final VideoRepository videoRepository;
    private final ArticleRepository articleRepository;
    private final EventRepository eventRepository;
    private final AnnouncementRepository announcementRepository;
    private final GalleryRepository galleryRepository;
    private final ContactMessageRepository contactMessageRepository;

    public DashboardStatsResponse getStats() {

        return DashboardStatsResponse.builder()
                .videos(videoRepository.count())
                .articles(articleRepository.count())
                .events(eventRepository.count())
                .announcements(announcementRepository.count())
                .galleryItems(galleryRepository.count())
                .contactMessages(contactMessageRepository.count())
                .build();
    }
}