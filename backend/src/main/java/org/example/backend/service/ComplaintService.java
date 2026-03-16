package org.example.backend.service;

import org.example.backend.dto.ComplaintRequestDto;
import org.example.backend.dto.ComplaintResponseDto;
import org.example.backend.entity.Complaint;
import org.example.backend.entity.Department;
import org.example.backend.entity.User;
import org.example.backend.repository.ComplaintRepository;
import org.example.backend.repository.DepartmentRepository;
import org.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ComplaintService {
    private final ComplaintRepository complaintRepository;
    private final DepartmentRepository departmentRepository;
    private final UserRepository userRepository;

    @Autowired
    public ComplaintService(ComplaintRepository complaintRepository, DepartmentRepository departmentRepository, UserRepository userRepository) {
        this.complaintRepository = complaintRepository;
        this.departmentRepository = departmentRepository;
        this.userRepository = userRepository;
    }

    public Complaint createComplaint(ComplaintRequestDto dto) {
        User citizen = userRepository.findById(dto.getCitizenId())
                .orElseThrow(
                        () -> new IllegalArgumentException("Citizen with ID " + dto.getCitizenId() + " not found!")
                );
        Department department = departmentRepository.findById(dto.getDepartmentId())
                .orElseThrow(
                        () -> new IllegalArgumentException(
                                "Department with ID " + dto.getDepartmentId() + " not found!"
                        )
                );
        Complaint complaint = new Complaint();
        complaint.setTitle(dto.getTitle());
        complaint.setDescription(dto.getDescription());
        complaint.setLatitude(dto.getLatitude());
        complaint.setLongitude(dto.getLongitude());
        complaint.setCitizen(citizen);
        complaint.setDepartment(department);

        return complaintRepository.save(complaint);
    }

    // Helper method to map Entity to DTO
    private ComplaintResponseDto mapToDto(Complaint complaint) {
        ComplaintResponseDto dto = new ComplaintResponseDto();
        dto.setId(complaint.getId());
        dto.setTitle(complaint.getTitle());
        dto.setDescription(complaint.getDescription());
        dto.setStatus(complaint.getStatus().name());
        dto.setCitizenName(complaint.getCitizen().getFullName());
        dto.setDepartmentName(complaint.getDepartment().getName());
        dto.setCreatedAt(complaint.getCreatedAt());
        return dto;
    }

    public ComplaintResponseDto updateComplaintStaus(Long complaintId, String newStatus) {
        // 1. Find the existing complaint
        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() -> new IllegalArgumentException("Complaint with ID " + complaintId + " not found!"));
        // 2. Safely convert the string to the Status enum
        try{
            Complaint.Status statusEnum = Complaint.Status.valueOf(newStatus.toUpperCase());
            complaint.setStatus(statusEnum);
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException("Invalid status provided: " + newStatus);
        }

        // 3. Save to database (the @PreUpdate will automatically update the updatedAt timestamp)
        Complaint updatedComplaint = complaintRepository.save(complaint);

        // 4. Return the safe DTO so the frontend can immediately update the UI
        return mapToDto(complaint);
    }

    public List<ComplaintResponseDto> getAllComplaints() {
        return complaintRepository.findAll().stream()
                .map(this::mapToDto)
                .toList();
    }

    public List<ComplaintResponseDto> getComplaintsByCitizen(Long citizenId) {
        return complaintRepository.findByCitizenId(citizenId).stream()
                .map(this::mapToDto)
                .toList();
    }

    public List<ComplaintResponseDto> getComplaintsByDepartment(Long departmentId) {
        return complaintRepository.findByDepartmentId(departmentId).stream()
                .map(this::mapToDto)
                .toList();
    }
}
