package com.tanzeemehussaini.backend.controller;

import com.tanzeemehussaini.backend.dto.EventRequest;
import com.tanzeemehussaini.backend.dto.EventResponse;
import com.tanzeemehussaini.backend.dto.PageResponse;
import com.tanzeemehussaini.backend.service.EventService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/events")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class EventController {

    private final EventService eventService;

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
    public EventResponse addEvent(
            @Valid @RequestBody EventRequest request) {
        return eventService.addEvent(request);
    }

    @GetMapping
    public PageResponse<EventResponse> getAllEvents(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return buildPageResponse(eventService.getAllEvents(page, size));
    }

    @GetMapping("/upcoming")
    public PageResponse<EventResponse> getUpcomingEvents(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return buildPageResponse(eventService.getUpcomingEvents(page, size));
    }

    @GetMapping("/featured")
    public PageResponse<EventResponse> getFeaturedEvents(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return buildPageResponse(eventService.getFeaturedEvents(page, size));
    }

    @GetMapping("/{id}")
    public EventResponse getEventById(@PathVariable Long id) {
        return eventService.getEventById(id);
    }

    @PutMapping("/{id}")
    public EventResponse updateEvent(
            @PathVariable Long id,
            @Valid @RequestBody EventRequest request) {
        return eventService.updateEvent(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteEvent(@PathVariable Long id) {
        eventService.deleteEvent(id);
    }
}