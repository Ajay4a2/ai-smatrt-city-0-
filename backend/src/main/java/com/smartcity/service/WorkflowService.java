package com.smartcity.service;

import com.smartcity.model.WorkflowAction;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class WorkflowService {

    public List<WorkflowAction> getActionsForIncident(String incidentType) {
        // Implement workflow logic based on incident type
        List<WorkflowAction> actions = new ArrayList<>();
        // Example actions
        if ("TRAFFIC_ACCIDENT".equals(incidentType)) {
            actions.add(new WorkflowAction("Dispatch ambulance", "HIGH"));
            actions.add(new WorkflowAction("Redirect traffic", "MEDIUM"));
            actions.add(new WorkflowAction("Notify police", "HIGH"));
        }
        return actions;
    }
}
