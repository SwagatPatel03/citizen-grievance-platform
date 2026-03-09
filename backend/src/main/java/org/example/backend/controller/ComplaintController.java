package org.example.backend.controller;

import org.example.backend.dto.ComplaintRequestDto;
import org.example.backend.dto.ComplaintResponseDto;
import org.example.backend.entity.Complaint;
import org.example.backend.service.ComplaintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/complaints")
public class ComplaintController {
    private final ComplaintService complaintService;

    @Autowired
    public ComplaintController(ComplaintService complaintService) {
        this.complaintService = complaintService;
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
    public ResponseEntity<List<ComplaintResponseDto>> getDepartmentComplaints(@PathVariable Long departmentId) {
        return ResponseEntity.ok(complaintService.getComplaintsByDepartment(departmentId));
    }
}
