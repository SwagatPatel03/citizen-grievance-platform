package org.example.backend.repository;

import org.example.backend.entity.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ComplaintRepository extends JpaRepository<Complaint,Long> {
    List<Complaint> findDepartmentId(Long departmentId);
}
