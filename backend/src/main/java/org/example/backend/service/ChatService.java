package org.example.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ChatService {

    @Value("${gemini.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public String getLokMitraResponse(String userMessage) {
        String url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=" + apiKey;

        // 1. Give the AI context
        String systemPrompt = "You are LokMitra, an official AI civic assistant for the LokShikayat GovTech platform in India. " +
                "Keep your answers brief, polite, and strictly focused on civic issues, public utilities, and filling grievances. " +
                "Do not use markdown formatting like asterisks or hash tags. " +
                "The citizen says: " + userMessage;

        // 2. Build the JSON structure expected by Gemini
        Map<String, Object> textPart = new HashMap<>();
        textPart.put("text", systemPrompt);

        Map<String, Object> parts = new HashMap<>();
        parts.put("parts", Collections.singletonList(textPart));

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("contents", Collections.singletonList(parts));

        // 3. Set Headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);

        try {
            // 4. Send the request
            ResponseEntity<Map<String, Object>> response = restTemplate
                    .exchange(
                            url,
                            HttpMethod.POST,
                            request,
                            new ParameterizedTypeReference<Map<String, Object>>() {}
                    );

            // 5. Parse the nested JSON response
            Map<String, Object> responseBody = response.getBody();
            List<Map<String, Object>> candidates = (List<Map<String, Object>>) responseBody.get("candidates");
            Map<String, Object> content = (Map<String, Object>) candidates.get(0).get("content");
            List<Map<String, Object>> partsList = (List<Map<String, Object>>) content.get("parts");

            return (String) partsList.get(0).get("text");
        } catch (Exception e) {
            System.err.println("AI Request Failed: " + e.getMessage());
            return "I am currently experiencing connectivity issues with the central server. Please try again later or contact the emergency directory";
        }
    }
}
