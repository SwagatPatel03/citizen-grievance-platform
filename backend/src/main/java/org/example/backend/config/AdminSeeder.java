package org.example.backend.config;

import org.example.backend.entity.Role;
import org.example.backend.entity.User;
import org.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void run(String... args) throws Exception {
        // Check if the admin user already exists
        if(!userRepository.existsByEmail("admin@lokshikayat.gov.in")) {
            User admin = new User();
            admin.setFullName("System Administrator");
            admin.setEmail("admin@lokshikayat.gov.in");
            admin.setPasswordHash(passwordEncoder.encode("Admin@123"));
            admin.setRole(Role.ADMIN);

            userRepository.save(admin);
            System.out.println("Admin user created successfully!");
        }
    }
}
