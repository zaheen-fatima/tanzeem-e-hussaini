package com.tanzeemehussaini.backend.controller;

import com.tanzeemehussaini.backend.dto.AnnouncementRequest;
import com.tanzeemehussaini.backend.dto.AnnouncementResponse;
import com.tanzeemehussaini.backend.dto.PageResponse;
import com.tanzeemehussaini.backend.service.AnnouncementService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/announcements")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AnnouncementController {

    private final AnnouncementService announcementService;

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
    public AnnouncementResponse addAnnouncement(
            @Valid @RequestBody AnnouncementRequest request) {

        return announcementService.addAnnouncement(request);
    }

    @GetMapping
    public PageResponse<AnnouncementResponse> getAllAnnouncements(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        return buildPageResponse(
                announcementService.getAllAnnouncements(page, size)
        );
    }

    @GetMapping("/active")
    public PageResponse<AnnouncementResponse> getActiveAnnouncements(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        return buildPageResponse(
                announcementService.getActiveAnnouncements(page, size)
        );
    }

    @GetMapping("/{id}")
    public AnnouncementResponse getAnnouncementById(
            @PathVariable Long id) {

        return announcementService.getAnnouncementById(id);
    }

    @PutMapping("/{id}")
    public AnnouncementResponse updateAnnouncement(
            @PathVariable Long id,
            @Valid @RequestBody AnnouncementRequest request) {

        return announcementService.updateAnnouncement(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteAnnouncement(@PathVariable Long id) {
        announcementService.deleteAnnouncement(id);
    }
}