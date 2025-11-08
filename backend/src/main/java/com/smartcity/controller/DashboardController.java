package com.smartcity.controller;

import com.smartcity.dto.DashboardStats;
import com.smartcity.service.CityOperationService;
import com.smartcity.service.TrafficService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    @Autowired
    private CityOperationService operationService;

    @Autowired
    private TrafficService trafficService;

    @GetMapping("/overview")
    public Map<String, Object> getDashboardOverview() {
        Map<String, Object> overview = new HashMap<>();
        // Populate with real data
        overview.put("totalOperations", operationService.getAllOperations().size());
        overview.put("criticalOperations", operationService.getCriticalOperations().size());
        overview.put("trafficLocations", trafficService.getCurrentTraffic().size());
        return overview;
    }

    @GetMapping("/stats")
    public DashboardStats getSystemStats() {
        // Implement system stats
        return new DashboardStats();
    }
}
