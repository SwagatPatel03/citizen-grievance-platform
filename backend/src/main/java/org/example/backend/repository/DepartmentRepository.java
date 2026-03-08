package org.example.backend.repository;

import org.example.backend.entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepository extends JpaRepository<Department,Long> {
    boolean existsByName(String name);
}
