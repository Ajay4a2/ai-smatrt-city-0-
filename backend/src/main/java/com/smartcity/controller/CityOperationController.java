package com.smartcity.controller;

import com.smartcity.model.CityOperation;
import com.smartcity.service.CityOperationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/operations")
@CrossOrigin(origins = "*")
public class CityOperationController {

    @Autowired
    private CityOperationService service;

    @GetMapping
    public List<CityOperation> getAllOperations() {
        return service.getAllOperations();
    }

    @GetMapping("/active")
    public List<CityOperation> getActiveOperations() {
        return service.getActiveOperations();
    }

    @GetMapping("/critical")
    public List<CityOperation> getCriticalOperations() {
        return service.getCriticalOperations();
    }

    @PostMapping
    public CityOperation createOperation(@RequestBody CityOperation operation) {
        return service.createOperation(operation);
    }

    @PostMapping("/generate-sample")
    public ResponseEntity<String> generateSampleData() {
        service.generateSampleData();
        return ResponseEntity.ok("Sample data generated successfully");
    }

    @GetMapping("/analyze-trends")
    public ResponseEntity<String> analyzeTrends() {
        String analysis = service.analyzeOperationsTrend();
        return ResponseEntity.ok(analysis);
    }
}
