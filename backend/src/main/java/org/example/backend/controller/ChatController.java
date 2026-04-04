package org.example.backend.controller;

import org.example.backend.dto.ChatRequestDto;
import org.example.backend.service.ChatService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.Collections;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private final ChatService chatService;

    @Autowired
    public ChatController(ChatService chatService) {
        this.chatService = chatService;
    }

    @PostMapping
    public ResponseEntity<?> askLokMitra(@RequestBody ChatRequestDto request) {
        String reply = chatService.getLokMitraResponse(request.getMessage());
        return ResponseEntity.ok(Collections.singletonMap("reply", reply));
    }
}
