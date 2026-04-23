package org.example.backend.dto;

import java.util.Set;

public class OfficerRegistrationDto {
    private String fullName;
    private String email;
    private String password;

    // Uses a Set of Ids to support the many to many mappings
    private Set<Long> departmentIds;

    // Getters and setters

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Long> getDepartmentIds() {
        return departmentIds;
    }

    public void setDepartmentIds(Set<Long> departmentIds) {
        this.departmentIds = departmentIds;
    }
}
