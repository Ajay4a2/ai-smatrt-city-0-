package com.smartcity.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class AIService {

    @Value("${ai.service.url:http://localhost:5000}")
    private String aiServiceUrl;

    @Autowired
    private RestTemplate restTemplate;

    public String predictTraffic(String location) {
        try {
            String url = aiServiceUrl + "/predict/traffic?location=" + location;
            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
            return response.getBody();
        } catch (Exception e) {
            return "AI Service unavailable. Using fallback prediction: Moderate traffic expected.";
        }
    }

    public String analyzeOperationsTrend() {
        try {
            String url = aiServiceUrl + "/analyze/trends";
            ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
            return response.getBody();
        } catch (Exception e) {
            return "AI Service unavailable. Trend analysis temporarily offline.";
        }
    }
}
