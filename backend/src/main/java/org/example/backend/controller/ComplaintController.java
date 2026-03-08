package org.example.backend.controller;

import org.example.backend.dto.ComplaintRequestDto;
import org.example.backend.entity.Complaint;
import org.example.backend.service.ComplaintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
