package org.example.backend.repository;

import org.example.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // Spring Data JPA automatically provides methods like save(), findById(), findAll().
    // You can add custom queries here later, like finding a user by email:
    boolean existsByEmail(String email);
}
