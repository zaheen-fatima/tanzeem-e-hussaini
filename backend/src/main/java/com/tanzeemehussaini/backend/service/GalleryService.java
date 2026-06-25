package com.tanzeemehussaini.backend.service;

import com.tanzeemehussaini.backend.dto.GalleryRequest;
import com.tanzeemehussaini.backend.dto.GalleryResponse;
import com.tanzeemehussaini.backend.entity.GalleryItem;
import com.tanzeemehussaini.backend.exception.ResourceNotFoundException;
import com.tanzeemehussaini.backend.repository.GalleryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GalleryService {

    private final GalleryRepository galleryRepository;

    public GalleryResponse addItem(GalleryRequest request) {

        GalleryItem item = GalleryItem.builder()
                .title(request.getTitle())
                .imageUrl(request.getImageUrl())
                .category(request.getCategory())
                .description(request.getDescription())
                .build();

        return mapToResponse(galleryRepository.save(item));
    }

    public Page<GalleryResponse> getAllItems(int page, int size) {
        return galleryRepository.findAll(createPageable(page, size))
                .map(this::mapToResponse);
    }

    public Page<GalleryResponse> getItemsByCategory(
            String category,
            int page,
            int size
    ) {
        return galleryRepository
                .findByCategoryIgnoreCase(category, createPageable(page, size))
                .map(this::mapToResponse);
    }

    public GalleryResponse getItemById(Long id) {
        GalleryItem item = galleryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Gallery item not found"));

        return mapToResponse(item);
    }

    public GalleryResponse updateItem(Long id, GalleryRequest request) {
        GalleryItem item = galleryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Gallery item not found"));

        item.setTitle(request.getTitle());
        item.setImageUrl(request.getImageUrl());
        item.setCategory(request.getCategory());
        item.setDescription(request.getDescription());

        return mapToResponse(galleryRepository.save(item));
    }

    public void deleteItem(Long id) {
        if (!galleryRepository.existsById(id)) {
            throw new ResourceNotFoundException("Gallery item not found");
        }

        galleryRepository.deleteById(id);
    }

    private Pageable createPageable(int page, int size) {
        return PageRequest.of(
                page,
                size,
                Sort.by("uploadedAt").descending()
        );
    }

    private GalleryResponse mapToResponse(GalleryItem item) {
        return GalleryResponse.builder()
                .id(item.getId())
                .title(item.getTitle())
                .imageUrl(item.getImageUrl())
                .category(item.getCategory())
                .description(item.getDescription())
                .uploadedAt(item.getUploadedAt())
                .build();
    }
}