package com.smartcity.controller;

import com.smartcity.model.TrafficData;
import com.smartcity.service.TrafficService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/traffic")
@CrossOrigin(origins = "*")
public class TrafficController {

    @Autowired
    private TrafficService service;

    @GetMapping("/current")
    public List<TrafficData> getCurrentTraffic() {
        return service.getCurrentTraffic();
    }

    @GetMapping("/history/{location}")
    public List<TrafficData> getTrafficHistory(@PathVariable String location) {
        return service.getTrafficHistory(location);
    }

    @GetMapping("/predict/{location}")
    public ResponseEntity<String> predictTraffic(@PathVariable String location) {
        String prediction = service.predictTraffic(location);
        return ResponseEntity.ok(prediction);
    }

    @PostMapping("/initialize")
    public ResponseEntity<String> initializeData() {
        service.initializeSampleData();
        return ResponseEntity.ok("Traffic data initialized");
    }
}
