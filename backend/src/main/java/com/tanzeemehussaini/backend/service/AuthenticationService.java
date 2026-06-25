package com.tanzeemehussaini.backend.service;

import com.tanzeemehussaini.backend.dto.LoginRequest;
import com.tanzeemehussaini.backend.dto.LoginResponse;
import com.tanzeemehussaini.backend.entity.User;
import com.tanzeemehussaini.backend.repository.UserRepository;
import com.tanzeemehussaini.backend.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public LoginResponse login(LoginRequest request) {

        User user = userRepository.findByUsername(
                request.getUsername()
        ).orElseThrow(() ->
                new RuntimeException("Invalid username or password"));

        boolean passwordMatches =
                passwordEncoder.matches(
                        request.getPassword(),
                        user.getPassword()
                );

        if (!passwordMatches) {
            throw new RuntimeException(
                    "Invalid username or password"
            );
        }

        String token =
                jwtUtil.generateToken(
                        user.getUsername()
                );

        return new LoginResponse(token);
    }
}