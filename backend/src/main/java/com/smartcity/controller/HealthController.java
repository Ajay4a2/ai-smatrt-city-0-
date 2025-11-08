package com.smartcity.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/actuator")
@CrossOrigin(origins = "*")
public class HealthController {
    
    @GetMapping("/health")
    public String health() {
        return "{\"status\": \"UP\"}";
    }
}
