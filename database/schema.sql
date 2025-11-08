USE smart_city;

-- Additional indexes for query optimization
CREATE INDEX IF NOT EXISTS idx_emergency_location ON emergency_incidents(location);
CREATE INDEX IF NOT EXISTS idx_operations_location ON city_operations(location);
CREATE INDEX IF NOT EXISTS idx_traffic_congestion ON traffic_data(congestion_level);
CREATE INDEX IF NOT EXISTS idx_devices_type_status ON iot_devices(device_type, status);

-- Additional views for reporting
CREATE OR REPLACE VIEW daily_operations_summary AS
SELECT 
    DATE(timestamp) as operation_date,
    operation_type,
    COUNT(*) as total_operations,
    AVG(severity) as avg_severity,
    SUM(CASE WHEN severity >= 4 THEN 1 ELSE 0 END) as critical_operations
FROM city_operations 
WHERE timestamp >= CURDATE() - INTERVAL 7 DAY
GROUP BY DATE(timestamp), operation_type
ORDER BY operation_date DESC, total_operations DESC;

CREATE OR REPLACE VIEW device_status_summary AS
SELECT 
    device_type,
    COUNT(*) as total_devices,
    SUM(CASE WHEN status = 'ACTIVE' THEN 1 ELSE 0 END) as active_devices,
    SUM(CASE WHEN status = 'INACTIVE' THEN 1 ELSE 0 END) as inactive_devices,
    SUM(CASE WHEN status = 'MAINTENANCE' THEN 1 ELSE 0 END) as maintenance_devices,
    AVG(battery_level) as avg_battery_level
FROM iot_devices 
GROUP BY device_type
ORDER BY total_devices DESC;
