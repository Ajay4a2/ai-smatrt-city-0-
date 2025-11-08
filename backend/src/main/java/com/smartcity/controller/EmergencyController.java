package com.smartcity.controller;

import com.smartcity.model.EmergencyIncident;
import com.smartcity.service.EmergencyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/emergency")
@CrossOrigin(origins = "*")
public class EmergencyController {

    @Autowired
    private EmergencyService service;

    @GetMapping("/incidents")
    public List<EmergencyIncident> getIncidents() {
        return service.getActiveIncidents();
    }

    @PostMapping("/incidents")
    public EmergencyIncident reportIncident(@RequestBody EmergencyIncident incident) {
        return service.reportIncident(incident);
    }

    @PostMapping("/incidents/{id}/resolve")
    public EmergencyIncident resolveIncident(@PathVariable Long id) {
        return service.resolveIncident(id);
    }
}
