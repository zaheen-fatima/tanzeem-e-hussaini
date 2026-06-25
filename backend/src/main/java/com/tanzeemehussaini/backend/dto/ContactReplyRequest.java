package com.tanzeemehussaini.backend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ContactReplyRequest {

    @NotBlank(message = "Reply is required")
    private String reply;
}