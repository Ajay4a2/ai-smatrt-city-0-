package com.smartcity.repository;

import com.smartcity.model.EmergencyIncident;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmergencyIncidentRepository extends JpaRepository<EmergencyIncident, Long> {
    List<EmergencyIncident> findByStatus(String status);
    List<EmergencyIncident> findByIncidentType(String incidentType);
}
