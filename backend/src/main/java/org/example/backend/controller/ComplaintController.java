package org.example.backend.controller;

import org.example.backend.dto.ComplaintRequestDto;
import org.example.backend.dto.ComplaintResponseDto;
import org.example.backend.dto.UpdateStatusDto;
import org.example.backend.entity.Complaint;
import org.example.backend.entity.Role;
import org.example.backend.entity.User;
import org.example.backend.repository.UserRepository;
import org.example.backend.service.ComplaintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/complaints")
public class ComplaintController {
    private final ComplaintService complaintService;
    private final UserRepository userRepository; // Added to fetch the user's assigned departments

    @Autowired
    public ComplaintController(ComplaintService complaintService, UserRepository userRepository) {
        this.complaintService = complaintService;
        this.userRepository = userRepository;
    }

    @PostMapping("/submit")
    public ResponseEntity<Complaint> submitComplaint(@RequestBody ComplaintRequestDto dto) {
        try{
            Complaint savedComplaint = complaintService.createComplaint(dto);
            return ResponseEntity.ok(savedComplaint);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    // For the Admin Dashboard
    @GetMapping("/all")
    public ResponseEntity<List<ComplaintResponseDto>> getAllComplaints() {
        return ResponseEntity.ok(complaintService.getAllComplaints());
    }

    // For the Citizen Dashboard
    @GetMapping("/citizen/{citizenId}")
    public ResponseEntity<List<ComplaintResponseDto>> getCitizenComplaints(@PathVariable Long citizenId) {
        return ResponseEntity.ok(complaintService.getComplaintsByCitizen(citizenId));
    }

    // For the Officer Dashboard
    @GetMapping("/department/{departmentId}")
    public ResponseEntity<?> getDepartmentComplaints(@PathVariable Long departmentId, @AuthenticationPrincipal UserDetails userDetails) {
        // 1. Fetch the logged-in officer from the DB using their email (username)
        User officer = userRepository.findByEmail(userDetails.getUsername()).orElseThrow(
                () -> new RuntimeException("Officer not found!")
        );
        // 2. SECURITY CHECK: Ensure the officer is assigned to the requested department
        boolean isAuthorized = officer.getAssignedDepartments().stream()
                .anyMatch(dept -> dept.getId().equals(departmentId));
        // 3. Admins bypass the check, but Officers are strictly blocked if unauthorized
        if (!isAuthorized && !officer.getRole().equals(Role.ADMIN)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body("Error: You are not authorized to view this department's queue.");
        }

        // 4. If authorized, proceed to fetch the complaints for this department
        return ResponseEntity.ok(complaintService.getComplaintsByDepartment(departmentId));
    }

    // For updating the status of a complaint
    @PatchMapping("/{id}/status")
    public ResponseEntity<ComplaintResponseDto> updateStatus(
            @PathVariable Long id, @RequestBody UpdateStatusDto dto
    ) {
        try {
            ComplaintResponseDto updatedComplaint = complaintService.updateComplaintStaus(id, dto.getStatus());
            return ResponseEntity.ok(updatedComplaint);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}
