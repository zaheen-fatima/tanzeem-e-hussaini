package com.tanzeemehussaini.backend.dto;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class ContactResponse {

    private Long id;
    private String name;
    private String email;
    private String phone;
    private String message;
    private String status;
    private String reply;
    private LocalDateTime createdAt;
    private LocalDateTime repliedAt;
}