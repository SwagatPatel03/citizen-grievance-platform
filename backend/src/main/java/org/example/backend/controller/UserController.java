package org.example.backend.controller;

import org.example.backend.dto.AuthResponseDto;
import org.example.backend.dto.LoginRequestDto;
import org.example.backend.dto.RegisterRequestDto;
import org.example.backend.entity.Role;
import org.example.backend.entity.User;
import org.example.backend.repository.UserRepository;
import org.example.backend.security.JwtUtil;
import org.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.Authenticator;

@RestController
@RequestMapping("api/users")
public class UserController {
    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final AuthenticationManager authenticationManager;

    @Autowired
    public UserController(UserService userService, JwtUtil jwtUtil, UserRepository userRepository, AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
        this.authenticationManager = authenticationManager;
    }

    // This endpoint listens for POST requests to create a new user
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody RegisterRequestDto request) {
       try {
           // 1. Map the DTO securely to a new User entity
           User user = new User();
           user.setFullName(request.getName());
           user.setEmail(request.getEmail());
           user.setPasswordHash(request.getPassword());

           // 2. Force the role to CITIZEN, ignoring anything else
           user.setRole(Role.CITIZEN);

           // 3. Save the user
           User savedUser = userService.registerUser(user);

           // 4. Clear the password has before returning
           savedUser.setPasswordHash(null);

           return ResponseEntity.ok(savedUser);
       } catch (IllegalArgumentException e) {
           return ResponseEntity.badRequest().body("Registration failed: Email may already be in use.");
       } catch (Exception e) {
           return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during registration.");
       }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDto loginRequest) {
        try {
            // 1. Spring Security checks the password against the database hash automatically
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword())
            );

            // 2. If successful, fetch the user from the database to get their ID and Role
            User user = userRepository.findByEmail(loginRequest.getEmail())
                    .orElseThrow(() -> new RuntimeException("User not found with email: " + loginRequest.getEmail()));

            // 3. Generate the JWT Token
            String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());

            // 4. Return the Token and the User Info to the React frontend
            return ResponseEntity.ok(new AuthResponseDto(
                    token, user.getId(), user.getFullName(), user.getRole().name()
            ));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password");
        }
    }
}
