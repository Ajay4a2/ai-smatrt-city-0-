package com.smartcity.service;

import com.smartcity.model.EmergencyIncident;
import com.smartcity.repository.EmergencyIncidentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class EmergencyService {

    @Autowired
    private EmergencyIncidentRepository repository;

    public List<EmergencyIncident> getActiveIncidents() {
        return repository.findByStatus("ACTIVE");
    }

    public EmergencyIncident reportIncident(EmergencyIncident incident) {
        incident.setReportedAt(LocalDateTime.now());
        incident.setStatus("ACTIVE");
        return repository.save(incident);
    }

    public EmergencyIncident resolveIncident(Long id) {
        Optional<EmergencyIncident> incidentOpt = repository.findById(id);
        if (incidentOpt.isPresent()) {
            EmergencyIncident incident = incidentOpt.get();
            incident.setStatus("RESOLVED");
            incident.setResolvedAt(LocalDateTime.now());
            return repository.save(incident);
        }
        return null;
    }
}
