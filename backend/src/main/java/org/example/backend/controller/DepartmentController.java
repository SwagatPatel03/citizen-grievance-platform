package org.example.backend.controller;

import org.example.backend.entity.Department;
import org.example.backend.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/departments")
public class DepartmentController {
    private final DepartmentService departmentService;

    @Autowired
    public DepartmentController(DepartmentService departmentService) {
        this.departmentService = departmentService;
    }

    @PostMapping(value = "/create")
    public ResponseEntity<Department> createDepartment(@RequestBody Department department) {
        try {
            Department savedDepartment = departmentService.createDepartment(department);
            return ResponseEntity.ok(savedDepartment);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping(value = "/all")
    public List<Department> getAllDepartments() {
        return departmentService.getAllDepartments();
    }
}
