package com.tanzeemehussaini.backend.config;

import com.tanzeemehussaini.backend.entity.Role;
import com.tanzeemehussaini.backend.entity.User;
import com.tanzeemehussaini.backend.repository.RoleRepository;
import com.tanzeemehussaini.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AdminInitializer implements CommandLineRunner {

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;

    @Value("${app.admin.username}")
    private String adminUsername;

    @Value("${app.admin.password}")
    private String adminPassword;

    @Override
    public void run(String... args) {

        Role adminRole = roleRepository
                .findByName("ROLE_ADMIN")
                .orElseGet(() -> {

                    Role role = Role.builder()
                            .name("ROLE_ADMIN")
                            .build();

                    return roleRepository.save(role);
                });

        if (userRepository.findByUsername(adminUsername).isPresent()) {

            System.out.println("Admin already exists");

            return;
        }

        User admin = User.builder()
                .username(adminUsername)
                .password(
                        passwordEncoder.encode(adminPassword)
                )
                .role(adminRole)
                .build();

        userRepository.save(admin);

        System.out.println("Default admin created successfully");
    }
}