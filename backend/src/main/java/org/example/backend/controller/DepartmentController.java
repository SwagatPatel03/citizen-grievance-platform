package org.example.backend.controller;

import org.example.backend.dto.DepartmentResponseDto;
import org.example.backend.entity.Department;
import org.example.backend.entity.User;
import org.example.backend.repository.UserRepository;
import org.example.backend.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/departments")
public class DepartmentController {
    private final DepartmentService departmentService;
    private final UserRepository userRepository;

    @Autowired
    public DepartmentController(DepartmentService departmentService, UserRepository userRepository) {
        this.departmentService = departmentService;
        this.userRepository = userRepository;
    }

    @GetMapping(value = "/all")
    public ResponseEntity<List<DepartmentResponseDto>> getAllDepartments() {

        // 1. Fetch raw entities from the database
        List<DepartmentResponseDto> safeDepartments = departmentService.getAllDepartments()
                .stream()
                // 2. Map each raw Department entity into a safe DTO
                .map(dept -> new DepartmentResponseDto(
                        dept.getId(),
                        dept.getName(),
                        dept.getDescription()
                ))
                .toList();

        // 3. Return the safe List to react
        return ResponseEntity.ok(safeDepartments);
    }

    // Get only the departments assigned to the logged-in Officer
    @GetMapping(value = "/mine")
    public ResponseEntity<List<DepartmentResponseDto>> getMyDepartments(@AuthenticationPrincipal UserDetails userDetails) {
        User officer = userRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("Officer not found!"));
        // Extract their assigned departments and convert to DTOs
        List<DepartmentResponseDto> myDepts = officer.getAssignedDepartments().stream()
                .map(dept -> new DepartmentResponseDto(
                        dept.getId(),
                        dept.getName(),
                        dept.getDescription()
                )).toList();
        return ResponseEntity.ok(myDepts);
    }
}
