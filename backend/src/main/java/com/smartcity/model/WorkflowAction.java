package com.smartcity.model;

public class WorkflowAction {
    private String action;
    private String priority;

    public WorkflowAction(String action, String priority) {
        this.action = action;
        this.priority = priority;
    }

    // Getters and Setters
    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }

    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }
}
