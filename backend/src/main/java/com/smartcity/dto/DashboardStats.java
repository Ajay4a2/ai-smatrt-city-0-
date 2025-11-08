package com.smartcity.dto;

import java.util.Map;

public class DashboardStats {
    private Integer totalOperations;
    private Integer criticalOperations;
    private Integer activeDevices;
    private Map<String, Long> operationsByType;

    // Getters and Setters
    public Integer getTotalOperations() { return totalOperations; }
    public void setTotalOperations(Integer totalOperations) { this.totalOperations = totalOperations; }

    public Integer getCriticalOperations() { return criticalOperations; }
    public void setCriticalOperations(Integer criticalOperations) { this.criticalOperations = criticalOperations; }

    public Integer getActiveDevices() { return activeDevices; }
    public void setActiveDevices(Integer activeDevices) { this.activeDevices = activeDevices; }

    public Map<String, Long> getOperationsByType() { return operationsByType; }
    public void setOperationsByType(Map<String, Long> operationsByType) { this.operationsByType = operationsByType; }
}
