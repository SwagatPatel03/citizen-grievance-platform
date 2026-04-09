package org.example.backend.repository;

import org.example.backend.entity.PollOption;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PollOptionRepository extends JpaRepository<PollOption,Long> {
}
