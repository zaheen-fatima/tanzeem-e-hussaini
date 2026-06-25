package com.tanzeemehussaini.backend.service;

import com.tanzeemehussaini.backend.dto.EventRequest;
import com.tanzeemehussaini.backend.dto.EventResponse;
import com.tanzeemehussaini.backend.entity.Event;
import com.tanzeemehussaini.backend.exception.ResourceNotFoundException;
import com.tanzeemehussaini.backend.repository.EventRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class EventService {

    private final EventRepository eventRepository;

    public EventResponse addEvent(EventRequest request) {
        Event event = Event.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .khitabatBy(request.getKhitabatBy())
                .eventDate(request.getEventDate())
                .startTime(request.getStartTime())
                .location(request.getLocation())
                .bannerImageUrl(request.getBannerImageUrl())
                .featured(request.isFeatured())
                .build();

        return mapToResponse(eventRepository.save(event));
    }

    public Page<EventResponse> getAllEvents(int page, int size) {
        return eventRepository.findAll(createPageable(page, size))
                .map(this::mapToResponse);
    }

    public Page<EventResponse> getUpcomingEvents(int page, int size) {
        return eventRepository
                .findByEventDateGreaterThanEqual(
                        LocalDate.now(),
                        createPageable(page, size)
                )
                .map(this::mapToResponse);
    }

    public Page<EventResponse> getFeaturedEvents(int page, int size) {
        return eventRepository
                .findByFeaturedTrue(createPageable(page, size))
                .map(this::mapToResponse);
    }

    public EventResponse getEventById(Long id) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found"));

        return mapToResponse(event);
    }

    public EventResponse updateEvent(Long id, EventRequest request) {
        Event event = eventRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Event not found"));

        event.setTitle(request.getTitle());
        event.setDescription(request.getDescription());
        event.setKhitabatBy(request.getKhitabatBy());
        event.setEventDate(request.getEventDate());
        event.setStartTime(request.getStartTime());
        event.setLocation(request.getLocation());
        event.setBannerImageUrl(request.getBannerImageUrl());
        event.setFeatured(request.isFeatured());

        return mapToResponse(eventRepository.save(event));
    }

    public void deleteEvent(Long id) {
        if (!eventRepository.existsById(id)) {
            throw new ResourceNotFoundException("Event not found");
        }

        eventRepository.deleteById(id);
    }

    private Pageable createPageable(int page, int size) {
        return PageRequest.of(
                page,
                size,
                Sort.by("eventDate").ascending()
        );
    }

    private EventResponse mapToResponse(Event event) {
        return EventResponse.builder()
                .id(event.getId())
                .title(event.getTitle())
                .description(event.getDescription())
                .khitabatBy(event.getKhitabatBy())
                .eventDate(event.getEventDate())
                .startTime(event.getStartTime())
                .location(event.getLocation())
                .bannerImageUrl(event.getBannerImageUrl())
                .featured(event.isFeatured())
                .createdAt(event.getCreatedAt())
                .updatedAt(event.getUpdatedAt())
                .build();
    }
}