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
}
