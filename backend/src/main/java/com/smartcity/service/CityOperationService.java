package com.smartcity.service;

import com.smartcity.model.CityOperation;
import com.smartcity.repository.CityOperationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Service
public class CityOperationService {

    @Autowired
    private CityOperationRepository repository;

    @Autowired
    private AIService aiService;

    private Random random = new Random();

    public List<CityOperation> getAllOperations() {
        return repository.findAll();
    }

    public List<CityOperation> getActiveOperations() {
        return repository.findRecentOperations(LocalDateTime.now().minusHours(24));
    }

    public List<CityOperation> getCriticalOperations() {
        return repository.findBySeverityGreaterThanEqual(4);
    }

    public CityOperation createOperation(CityOperation operation) {
        operation.setTimestamp(LocalDateTime.now());
        return repository.save(operation);
    }

    public void generateSampleData() {
        String[] types = {"TRAFFIC", "SECURITY", "UTILITY", "EMERGENCY"};
        String[] statuses = {"NORMAL", "WARNING", "CRITICAL"};
        String[] locations = {"Downtown", "North District", "South District", "East District", "West District"};

        for (int i = 0; i < 20; i++) {
            CityOperation operation = new CityOperation();
            operation.setOperationType(types[random.nextInt(types.length)]);
            operation.setStatus(statuses[random.nextInt(statuses.length)]);
            operation.setLocation(locations[random.nextInt(locations.length)]);
            operation.setDescription("Operation " + (i + 1) + " in " + operation.getLocation());
            operation.setSeverity(random.nextInt(5) + 1);
            operation.setTimestamp(LocalDateTime.now().minusMinutes(random.nextInt(1440)));
            operation.setLatitude(40.7128 + (random.nextDouble() - 0.5) * 0.1);
            operation.setLongitude(-74.0060 + (random.nextDouble() - 0.5) * 0.1);

            repository.save(operation);
        }
    }

    public String analyzeOperationsTrend() {
        return aiService.analyzeOperationsTrend();
    }
}
