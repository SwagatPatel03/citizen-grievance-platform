package org.example.backend.controller;

import org.example.backend.dto.OfficerRegistrationDto;
import org.example.backend.entity.Department;
import org.example.backend.entity.Role;
import org.example.backend.entity.User;
import org.example.backend.repository.DepartmentRepository;
import org.example.backend.repository.UserRepository;
import org.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private DepartmentRepository departmentRepository;

    @Autowired
    private UserService userService;

    // Department Management
    @PostMapping("/departments")
    public ResponseEntity<?> createDepartment(@RequestBody Department department) {
        if(departmentRepository.existsByName(department.getName())){
            return ResponseEntity.badRequest().body("Department already exists!");
        }
        Department savedDept = departmentRepository.save(department);
        return ResponseEntity.ok(savedDept);
    }

    @GetMapping("/departments")
    public ResponseEntity<List<Department>> getAllDepartments() {
        return ResponseEntity.ok(departmentRepository.findAll());
    }

    // Officer Management
    @PostMapping("/officers")
    public ResponseEntity<?> registerOfficer(@RequestBody OfficerRegistrationDto request) {
        User officer = new User();
        officer.setFullName(request.getFullName());
        officer.setEmail(request.getEmail());
        officer.setPasswordHash(request.getPassword()); // Handled by User Service

        // Force the role to officer
        officer.setRole(Role.OFFICER);

        // Fetch all requested departments and assign to this officer
        if(request.getDepartmentIds() != null && !request.getDepartmentIds().isEmpty()) {
            List<Department> departments = departmentRepository.findAllById(request.getDepartmentIds());
            if(departments.isEmpty()) {
                return ResponseEntity.badRequest().body("Error: None of the provided departments exist!");
            }
            officer.setAssignedDepartments(new HashSet<>(departments));
        }

        try {
            // Save using the existing UserService
            User savedOfficer = userService.registerUser(officer);
            savedOfficer.setPasswordHash(null); // Clear hash before returning
            return ResponseEntity.ok(savedOfficer);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error: " + e.getMessage());
        }
    }
}
