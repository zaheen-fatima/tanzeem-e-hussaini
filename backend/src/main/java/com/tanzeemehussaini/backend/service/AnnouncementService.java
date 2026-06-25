package com.tanzeemehussaini.backend.service;

import com.tanzeemehussaini.backend.dto.AnnouncementRequest;
import com.tanzeemehussaini.backend.dto.AnnouncementResponse;
import com.tanzeemehussaini.backend.entity.Announcement;
import com.tanzeemehussaini.backend.exception.ResourceNotFoundException;
import com.tanzeemehussaini.backend.repository.AnnouncementRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AnnouncementService {

    private final AnnouncementRepository announcementRepository;

    public AnnouncementResponse addAnnouncement(
            AnnouncementRequest request) {

        Announcement announcement =
                Announcement.builder()
                        .title(request.getTitle())
                        .message(request.getMessage())
                        .priority(request.getPriority())
                        .expiryDate(request.getExpiryDate())
                        .active(request.isActive())
                        .build();

        return mapToResponse(
                announcementRepository.save(announcement)
        );
    }

    public Page<AnnouncementResponse> getAllAnnouncements(
            int page,
            int size) {

        Pageable pageable =
                PageRequest.of(
                        page,
                        size,
                        Sort.by("createdAt").descending()
                );

        return announcementRepository
                .findAll(pageable)
                .map(this::mapToResponse);
    }

    public Page<AnnouncementResponse> getActiveAnnouncements(
            int page,
            int size) {

        Pageable pageable =
                PageRequest.of(
                        page,
                        size,
                        Sort.by("createdAt").descending()
                );

        return announcementRepository
                .findByActiveTrue(pageable)
                .map(this::mapToResponse);
    }

    public AnnouncementResponse getAnnouncementById(
            Long id) {

        Announcement announcement =
                announcementRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Announcement not found"));

        return mapToResponse(announcement);
    }

    public AnnouncementResponse updateAnnouncement(
            Long id,
            AnnouncementRequest request) {

        Announcement announcement =
                announcementRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Announcement not found"));

        announcement.setTitle(request.getTitle());
        announcement.setMessage(request.getMessage());
        announcement.setPriority(request.getPriority());
        announcement.setExpiryDate(request.getExpiryDate());
        announcement.setActive(request.isActive());

        return mapToResponse(
                announcementRepository.save(announcement)
        );
    }

    public void deleteAnnouncement(Long id) {

        if (!announcementRepository.existsById(id)) {
            throw new ResourceNotFoundException(
                    "Announcement not found"
            );
        }

        announcementRepository.deleteById(id);
    }

    private AnnouncementResponse mapToResponse(
            Announcement announcement) {

        return AnnouncementResponse.builder()
                .id(announcement.getId())
                .title(announcement.getTitle())
                .message(announcement.getMessage())
                .priority(announcement.getPriority())
                .expiryDate(announcement.getExpiryDate())
                .active(announcement.isActive())
                .createdAt(announcement.getCreatedAt())
                .updatedAt(announcement.getUpdatedAt())
                .build();
    }
}