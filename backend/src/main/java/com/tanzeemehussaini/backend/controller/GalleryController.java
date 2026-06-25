package com.tanzeemehussaini.backend.controller;

import com.tanzeemehussaini.backend.dto.*;
import com.tanzeemehussaini.backend.service.GalleryService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/gallery")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class GalleryController {

    private final GalleryService galleryService;

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
    public GalleryResponse addItem(@Valid @RequestBody GalleryRequest request) {
        return galleryService.addItem(request);
    }

    @GetMapping
    public PageResponse<GalleryResponse> getAllItems(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        return buildPageResponse(galleryService.getAllItems(page, size));
    }

    @GetMapping("/category/{category}")
    public PageResponse<GalleryResponse> getItemsByCategory(
            @PathVariable String category,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        return buildPageResponse(
                galleryService.getItemsByCategory(category, page, size)
        );
    }

    @GetMapping("/{id}")
    public GalleryResponse getItemById(@PathVariable Long id) {
        return galleryService.getItemById(id);
    }

    @PutMapping("/{id}")
    public GalleryResponse updateItem(
            @PathVariable Long id,
            @Valid @RequestBody GalleryRequest request) {

        return galleryService.updateItem(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteItem(@PathVariable Long id) {
        galleryService.deleteItem(id);
    }
}