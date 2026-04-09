package org.example.backend.controller;

import org.example.backend.entity.CommunityPost;
import org.example.backend.entity.PollOption;
import org.example.backend.repository.CommunityPostRepository;
import org.example.backend.repository.PollOptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/community")
public class CommunityController {

    @Autowired
    private CommunityPostRepository postRepository;

    @Autowired
    private PollOptionRepository pollOptionRepository;

    // 1. Get the feed of community posts
    @GetMapping("/feed")
    public ResponseEntity<List<CommunityPost>> getCommunityFeed(@RequestParam(defaultValue = "Ward 15 - Patia") String ward) {
        List<CommunityPost> feed = postRepository.findByWardOrderByCreatedAtDesc(ward);
        return ResponseEntity.ok(feed);
    }

    // 2. Handle voting on a poll option
    @PostMapping("/poll/vote/{optionId}")
    public ResponseEntity<?> voteOnPoll(@PathVariable Long optionId) {
        PollOption option = pollOptionRepository.findById(optionId)
                .orElseThrow(() -> new RuntimeException("Option not found"));
        option.incrementVotes(); // Add a vote
        pollOptionRepository.save(option); // Save to DB

        return ResponseEntity.ok("Vote successfully recorded!");
    }
}
