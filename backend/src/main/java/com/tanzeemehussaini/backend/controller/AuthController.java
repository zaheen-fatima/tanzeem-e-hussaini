package com.tanzeemehussaini.backend.controller;

import com.tanzeemehussaini.backend.dto.LoginRequest;
import com.tanzeemehussaini.backend.dto.LoginResponse;
import com.tanzeemehussaini.backend.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthenticationService authenticationService;

    @PostMapping("/login")
    public LoginResponse login(
            @RequestBody LoginRequest request) {

        return authenticationService.login(request);
    }
}