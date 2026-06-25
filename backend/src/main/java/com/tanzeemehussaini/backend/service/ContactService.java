package com.tanzeemehussaini.backend.service;

import com.tanzeemehussaini.backend.dto.ContactReplyRequest;
import com.tanzeemehussaini.backend.dto.ContactRequest;
import com.tanzeemehussaini.backend.dto.ContactResponse;
import com.tanzeemehussaini.backend.entity.ContactMessage;
import com.tanzeemehussaini.backend.exception.ResourceNotFoundException;
import com.tanzeemehussaini.backend.repository.ContactMessageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ContactService {

    private final ContactMessageRepository contactRepository;

    public ContactResponse submitMessage(ContactRequest request) {

        ContactMessage message = ContactMessage.builder()
                .name(request.getName())
                .email(request.getEmail())
                .phone(request.getPhone())
                .message(request.getMessage())
                .status("PENDING")
                .build();

        return mapToResponse(contactRepository.save(message));
    }

    public Page<ContactResponse> getAllMessages(int page, int size) {

        return contactRepository
                .findAll(createPageable(page, size))
                .map(this::mapToResponse);
    }

    public Page<ContactResponse> getMessagesByStatus(
            String status,
            int page,
            int size
    ) {

        return contactRepository
                .findByStatusIgnoreCase(
                        status,
                        createPageable(page, size)
                )
                .map(this::mapToResponse);
    }

    public ContactResponse getMessageById(Long id) {

        ContactMessage message = contactRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Contact message not found"));

        return mapToResponse(message);
    }

    public ContactResponse replyToMessage(
            Long id,
            ContactReplyRequest request
    ) {

        ContactMessage message = contactRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Contact message not found"));

        message.setReply(request.getReply());
        message.setStatus("REPLIED");
        message.setRepliedAt(LocalDateTime.now());

        return mapToResponse(contactRepository.save(message));
    }

    public void deleteMessage(Long id) {

        if (!contactRepository.existsById(id)) {
            throw new ResourceNotFoundException("Contact message not found");
        }

        contactRepository.deleteById(id);
    }

    private Pageable createPageable(int page, int size) {
        return PageRequest.of(
                page,
                size,
                Sort.by("createdAt").descending()
        );
    }

    private ContactResponse mapToResponse(ContactMessage message) {

        return ContactResponse.builder()
                .id(message.getId())
                .name(message.getName())
                .email(message.getEmail())
                .phone(message.getPhone())
                .message(message.getMessage())
                .status(message.getStatus())
                .reply(message.getReply())
                .createdAt(message.getCreatedAt())
                .repliedAt(message.getRepliedAt())
                .build();
    }
}