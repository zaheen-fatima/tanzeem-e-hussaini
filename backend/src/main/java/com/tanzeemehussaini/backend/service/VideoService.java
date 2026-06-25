package com.tanzeemehussaini.backend.service;

import com.tanzeemehussaini.backend.dto.VideoRequest;
import com.tanzeemehussaini.backend.dto.VideoResponse;
import com.tanzeemehussaini.backend.entity.Video;
import com.tanzeemehussaini.backend.exception.ResourceNotFoundException;
import com.tanzeemehussaini.backend.repository.VideoRepository;
import com.tanzeemehussaini.backend.util.YouTubeUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class VideoService {

    private final VideoRepository videoRepository;

    public VideoResponse addVideo(VideoRequest request) {

        String mediaType = request.getMediaType();

        if (mediaType == null || mediaType.isBlank()) {
            mediaType = "YOUTUBE";
        }

        String thumbnailUrl = request.getThumbnailUrl();

        if ((thumbnailUrl == null || thumbnailUrl.isBlank())
                && "YOUTUBE".equalsIgnoreCase(mediaType)) {

            thumbnailUrl = YouTubeUtil.generateThumbnailUrl(
                    request.getYoutubeUrl()
            );
        }

        Video video = Video.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .youtubeUrl(request.getYoutubeUrl())
                .thumbnailUrl(thumbnailUrl)
                .speaker(request.getSpeaker())
                .category(request.getCategory())
                .eventDate(request.getEventDate())
                .mediaType(mediaType)
                .videoFileUrl(request.getVideoFileUrl())
                .build();

        Video saved = videoRepository.save(video);

        return mapToResponse(saved);
    }

    public Page<VideoResponse> getAllVideos(int page, int size) {

        Pageable pageable = createPageable(page, size);

        return videoRepository
                .findAll(pageable)
                .map(this::mapToResponse);
    }

    public Page<VideoResponse> getVideosByCategory(
            String category,
            int page,
            int size
    ) {

        Pageable pageable = createPageable(page, size);

        return videoRepository
                .findByCategoryIgnoreCase(category, pageable)
                .map(this::mapToResponse);
    }

    public VideoResponse getVideoById(Long id) {

        Video video = videoRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Video not found"));

        return mapToResponse(video);
    }

    public VideoResponse updateVideo(
            Long id,
            VideoRequest request
    ) {

        Video video = videoRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Video not found"));

        String mediaType = request.getMediaType();

        if (mediaType == null || mediaType.isBlank()) {
            mediaType = "YOUTUBE";
        }

        String thumbnailUrl = request.getThumbnailUrl();

        if ((thumbnailUrl == null || thumbnailUrl.isBlank())
                && "YOUTUBE".equalsIgnoreCase(mediaType)) {

            thumbnailUrl = YouTubeUtil.generateThumbnailUrl(
                    request.getYoutubeUrl()
            );
        }

        video.setTitle(request.getTitle());
        video.setDescription(request.getDescription());
        video.setYoutubeUrl(request.getYoutubeUrl());
        video.setThumbnailUrl(thumbnailUrl);
        video.setSpeaker(request.getSpeaker());
        video.setCategory(request.getCategory());
        video.setEventDate(request.getEventDate());
        video.setMediaType(mediaType);
        video.setVideoFileUrl(request.getVideoFileUrl());

        Video updated = videoRepository.save(video);

        return mapToResponse(updated);
    }

    public Page<VideoResponse> searchVideos(
            String keyword,
            int page,
            int size
    ) {

        Pageable pageable = createPageable(page, size);

        return videoRepository
                .findByTitleContainingIgnoreCase(keyword, pageable)
                .map(this::mapToResponse);
    }

    public void deleteVideo(Long id) {

        if (!videoRepository.existsById(id)) {
            throw new ResourceNotFoundException("Video not found");
        }

        videoRepository.deleteById(id);
    }

    private Pageable createPageable(int page, int size) {
        return PageRequest.of(
                page,
                size,
                Sort.by("eventDate").descending()
        );
    }

    private VideoResponse mapToResponse(Video video) {

        return VideoResponse.builder()
                .id(video.getId())
                .title(video.getTitle())
                .description(video.getDescription())
                .youtubeUrl(video.getYoutubeUrl())
                .thumbnailUrl(video.getThumbnailUrl())
                .speaker(video.getSpeaker())
                .category(video.getCategory())
                .eventDate(video.getEventDate())
                .mediaType(video.getMediaType())
                .videoFileUrl(video.getVideoFileUrl())
                .createdAt(video.getCreatedAt())
                .updatedAt(video.getUpdatedAt())
                .build();
    }
}