package com.tanzeemehussaini.backend.controller;

import com.tanzeemehussaini.backend.dto.PageResponse;
import com.tanzeemehussaini.backend.dto.VideoRequest;
import com.tanzeemehussaini.backend.dto.VideoResponse;
import com.tanzeemehussaini.backend.service.VideoService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/videos")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class VideoController {

    private final VideoService videoService;

    private <T> PageResponse<T> buildPageResponse(Page<T> pageResult) {

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
    public VideoResponse addVideo(
            @Valid @RequestBody VideoRequest request) {

        return videoService.addVideo(request);
    }

    @GetMapping
    public PageResponse<VideoResponse> getAllVideos(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {

        Page<VideoResponse> result =
                videoService.getAllVideos(page, size);

        return buildPageResponse(result);
    }

    @GetMapping("/category/{category}")
    public PageResponse<VideoResponse> getVideosByCategory(
            @PathVariable String category,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {

        Page<VideoResponse> result =
                videoService.getVideosByCategory(category, page, size);

        return buildPageResponse(result);
    }


    @GetMapping("/{id}")
    public VideoResponse getVideoById(
            @PathVariable Long id) {

        return videoService.getVideoById(id);
    }

    @PutMapping("/{id}")
    public VideoResponse updateVideo(
            @PathVariable Long id,
            @Valid @RequestBody VideoRequest request
    ) {
        return videoService.updateVideo(id, request);
    }

    @GetMapping("/search")
    public PageResponse<VideoResponse> searchVideos(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {

        Page<VideoResponse> result =
                videoService.searchVideos(keyword, page, size);

        return buildPageResponse(result);
    }

    @DeleteMapping("/{id}")
    public void deleteVideo(@PathVariable Long id) {
        videoService.deleteVideo(id);
    }
}