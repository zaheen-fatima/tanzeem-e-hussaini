package com.tanzeemehussaini.backend.controller;

import com.tanzeemehussaini.backend.dto.*;
import com.tanzeemehussaini.backend.service.ContactService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ContactController {

    private final ContactService contactService;

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
    public ContactResponse submitMessage(
            @Valid @RequestBody ContactRequest request) {

        return contactService.submitMessage(request);
    }

    @GetMapping
    public PageResponse<ContactResponse> getAllMessages(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        return buildPageResponse(
                contactService.getAllMessages(page, size)
        );
    }

    @GetMapping("/status/{status}")
    public PageResponse<ContactResponse> getMessagesByStatus(
            @PathVariable String status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        return buildPageResponse(
                contactService.getMessagesByStatus(status, page, size)
        );
    }

    @GetMapping("/{id}")
    public ContactResponse getMessageById(
            @PathVariable Long id) {

        return contactService.getMessageById(id);
    }

    @PutMapping("/reply/{id}")
    public ContactResponse replyToMessage(
            @PathVariable Long id,
            @Valid @RequestBody ContactReplyRequest request) {

        return contactService.replyToMessage(id, request);
    }

    @DeleteMapping("/{id}")
    public void deleteMessage(@PathVariable Long id) {
        contactService.deleteMessage(id);
    }
}