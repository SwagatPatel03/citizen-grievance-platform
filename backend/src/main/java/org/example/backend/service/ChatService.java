package org.example.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@Service
public class ChatService {

    @Value("${nvidia.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public String getLokMitraResponse(String userMessage) {

        String url = "https://integrate.api.nvidia.com/v1/chat/completions";

        // System + user messages (OpenAI format)
        Map<String, String> systemMsg = Map.of(
                "role", "system",
                "content", "You are LokMitra, an official AI civic assistant for the LokShikayat GovTech platform in India. " +
                        "Keep answers brief, polite, and focused only on civic issues and grievance filing. " +
                        "Do not use markdown formatting."
        );

        Map<String, String> userMsg = Map.of(
                "role", "user",
                "content", userMessage
        );

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", "meta/llama-3.3-70b-instruct");
        requestBody.put("messages", List.of(systemMsg, userMsg));
        requestBody.put("temperature", 0.2);
        requestBody.put("top_p", 0.7);
        requestBody.put("max_tokens", 512);

        // Headers (IMPORTANT: Bearer token)
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);

        HttpEntity<Map<String, Object>> request =
                new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<Map<String, Object>> response =
                    restTemplate.exchange(
                            url,
                            HttpMethod.POST,
                            request,
                            new ParameterizedTypeReference<>() {}
                    );

            Map<String, Object> body = response.getBody();

            if (body == null || !body.containsKey("choices")) {
                return "No response received from AI service.";
            }

            List<Map<String, Object>> choices =
                    (List<Map<String, Object>>) body.get("choices");

            if (choices.isEmpty()) {
                return "AI returned an empty response.";
            }

            Map<String, Object> message =
                    (Map<String, Object>) choices.get(0).get("message");

            return message.get("content").toString();

        } catch (Exception e) {
            e.printStackTrace();
            return "Service temporarily unavailable. Please try again.";
        }
    }
}