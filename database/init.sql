-- Create database and user
CREATE DATABASE IF NOT EXISTS smart_city;
USE smart_city;

-- Create user for application
CREATE USER IF NOT EXISTS 'cityuser'@'%' IDENTIFIED BY 'citypass';
GRANT ALL PRIVILEGES ON smart_city.* TO 'cityuser'@'%';
FLUSH PRIVILEGES;

-- Create tables
CREATE TABLE IF NOT EXISTS city_operations (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    operation_type VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    location VARCHAR(255) NOT NULL,
    description TEXT,
    severity INT NOT NULL,
    timestamp DATETIME NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_type (operation_type),
    INDEX idx_status (status),
    INDEX idx_timestamp (timestamp),
    INDEX idx_severity (severity)
);

CREATE TABLE IF NOT EXISTS traffic_data (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    location VARCHAR(255) NOT NULL,
    congestion_level INT NOT NULL,
    average_speed DECIMAL(5, 2) NOT NULL,
    vehicle_count INT NOT NULL,
    timestamp DATETIME NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_location (location),
    INDEX idx_timestamp (timestamp),
    INDEX idx_congestion (congestion_level)
);

CREATE TABLE IF NOT EXISTS iot_devices (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    device_id VARCHAR(100) NOT NULL UNIQUE,
    device_type VARCHAR(50) NOT NULL,
    location VARCHAR(255) NOT NULL,
    status VARCHAR(50) NOT NULL,
    last_seen DATETIME NOT NULL,
    battery_level INT,
    signal_strength INT,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_type (device_type),
    INDEX idx_status (status),
    INDEX idx_last_seen (last_seen)
);

CREATE TABLE IF NOT EXISTS emergency_incidents (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    incident_type VARCHAR(50) NOT NULL,
    location VARCHAR(255) NOT NULL,
    severity INT NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'ACTIVE',
    reported_at DATETIME NOT NULL,
    resolved_at DATETIME,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_type (incident_type),
    INDEX idx_status (status),
    INDEX idx_reported (reported_at)
);

CREATE TABLE IF NOT EXISTS ai_predictions (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    prediction_type VARCHAR(50) NOT NULL,
    prediction_data JSON NOT NULL,
    confidence DECIMAL(5, 2) NOT NULL,
    generated_at DATETIME NOT NULL,
    valid_until DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_type (prediction_type),
    INDEX idx_generated (generated_at)
);

CREATE TABLE IF NOT EXISTS system_metrics (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    metric_name VARCHAR(100) NOT NULL,
    metric_value DECIMAL(10, 2) NOT NULL,
    unit VARCHAR(50),
    recorded_at DATETIME NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_name (metric_name),
    INDEX idx_recorded (recorded_at)
);

-- Insert sample data
INSERT INTO city_operations (operation_type, status, location, description, severity, timestamp, latitude, longitude) VALUES
('TRAFFIC', 'CRITICAL', 'Highway I-95 North', 'Major accident blocking three lanes, emergency services dispatched', 5, NOW() - INTERVAL 30 MINUTE, 40.712800, -74.006000),
('SECURITY', 'WARNING', 'Central Park', 'Increased security patrols required due to large public gathering', 3, NOW() - INTERVAL 45 MINUTE, 40.782900, -73.965400),
('UTILITY', 'NORMAL', 'Downtown District', 'Scheduled power maintenance - minimal impact expected', 2, NOW() - INTERVAL 2 HOUR, 40.758900, -73.985100),
('EMERGENCY', 'CRITICAL', 'Main Hospital', 'Ambulance dispatch required for emergency medical situation', 5, NOW() - INTERVAL 15 MINUTE, 40.741100, -73.989700),
('TRAFFIC', 'WARNING', 'Central Bridge', 'Heavy congestion during evening rush hour - consider alternative routes', 4, NOW() - INTERVAL 1 HOUR, 40.704800, -74.015300),
('UTILITY', 'NORMAL', 'West Residential Area', 'Water pipe maintenance - service interruption expected', 2, NOW() - INTERVAL 3 HOUR, 40.791000, -73.973800),
('SECURITY', 'NORMAL', 'Financial District', 'Routine security patrol - all systems operational', 1, NOW() - INTERVAL 4 HOUR, 40.707400, -74.011300);

INSERT INTO traffic_data (location, congestion_level, average_speed, vehicle_count, timestamp, latitude, longitude) VALUES
('Highway I-95 North', 9, 15.5, 890, NOW(), 40.712800, -74.006000),
('Central Bridge', 7, 25.2, 450, NOW(), 40.704800, -74.015300),
('Downtown Loop', 6, 30.8, 380, NOW(), 40.758900, -73.985100),
('East Expressway', 3, 55.5, 210, NOW(), 40.728200, -73.948700),
('West Highway', 5, 42.3, 320, NOW(), 40.750500, -74.005600),
('North-South Corridor', 8, 18.7, 560, NOW(), 40.761400, -73.977600);

INSERT INTO iot_devices (device_id, device_type, location, status, last_seen, battery_level, signal_strength, latitude, longitude) VALUES
('CAM_001', 'CAMERA', 'Central Square', 'ACTIVE', NOW(), 85, 92, 40.758900, -73.985100),
('SENSOR_001', 'TRAFFIC_SENSOR', 'Highway I-95', 'ACTIVE', NOW() - INTERVAL 5 MINUTE, 78, 88, 40.712800, -74.006000),
('DRONE_001', 'DRONE', 'Security Patrol', 'ACTIVE', NOW() - INTERVAL 2 MINUTE, 65, 95, 40.782900, -73.965400),
('WEATHER_001', 'WEATHER_STATION', 'City Center', 'ACTIVE', NOW(), 92, 85, 40.741100, -73.989700),
('AIR_QUALITY_001', 'AIR_QUALITY_SENSOR', 'Industrial Zone', 'ACTIVE', NOW() - INTERVAL 10 MINUTE, 88, 90, 40.680200, -73.948100),
('PARKING_001', 'PARKING_SENSOR', 'Shopping District', 'ACTIVE', NOW(), 95, 82, 40.750000, -73.990000);

INSERT INTO emergency_incidents (incident_type, location, severity, description, status, reported_at, latitude, longitude) VALUES
('ACCIDENT', 'Highway I-95 Exit 15', 5, 'Multi-vehicle collision with injuries - emergency services on scene', 'ACTIVE', NOW() - INTERVAL 25 MINUTE, 40.712800, -74.006000),
('FIRE', 'Commercial District Building 42', 4, 'Building fire reported - fire department responding', 'RESOLVED', NOW() - INTERVAL 2 HOUR, 40.750500, -73.993400),
('MEDICAL', 'Residential Area - 123 Main St', 3, 'Elderly person requiring medical assistance', 'ACTIVE', NOW() - INTERVAL 40 MINUTE, 40.728200, -73.948700),
('CRIME', 'Central Park West', 4, 'Reported theft incident - police investigating', 'ACTIVE', NOW() - INTERVAL 15 MINUTE, 40.782900, -73.971200);

INSERT INTO system_metrics (metric_name, metric_value, unit, recorded_at) VALUES
('CPU_USAGE', 45.2, 'percent', NOW()),
('MEMORY_USAGE', 68.7, 'percent', NOW()),
('NETWORK_THROUGHPUT', 520.5, 'MB/s', NOW()),
('DATABASE_CONNECTIONS', 24, 'connections', NOW()),
('ACTIVE_USERS', 156, 'users', NOW()),
('API_RESPONSE_TIME', 87, 'ms', NOW()),
('DATA_PROCESSED', 2.4, 'TB', NOW());

INSERT INTO ai_predictions (prediction_type, prediction_data, confidence, generated_at, valid_until) VALUES
('TRAFFIC', '{"location": "Highway I-95", "predicted_congestion": 8, "time_period": "evening_rush"}', 87.5, NOW(), NOW() + INTERVAL 2 HOUR),
('EMERGENCY', '{"risk_level": "MEDIUM", "area": "Downtown", "type": "ACCIDENT"}', 76.2, NOW(), NOW() + INTERVAL 6 HOUR),
('WEATHER', '{"impact": "MODERATE", "alert": "Heavy rain expected", "duration": "3 hours"}', 92.1, NOW(), NOW() + INTERVAL 12 HOUR);

-- Create views for common queries
CREATE VIEW active_emergencies AS
SELECT * FROM emergency_incidents WHERE status = 'ACTIVE' ORDER BY severity DESC, reported_at DESC;

CREATE VIEW critical_operations AS
SELECT * FROM city_operations WHERE severity >= 4 ORDER BY timestamp DESC;

CREATE VIEW device_health AS
SELECT device_id, device_type, location, status, battery_level, 
       TIMESTAMPDIFF(MINUTE, last_seen, NOW()) as minutes_since_last_seen
FROM iot_devices 
ORDER BY status, minutes_since_last_seen DESC;

CREATE VIEW traffic_summary AS
SELECT location, 
       AVG(congestion_level) as avg_congestion,
       MAX(congestion_level) as max_congestion,
       COUNT(*) as data_points,
       MAX(timestamp) as last_updated
FROM traffic_data 
WHERE timestamp >= NOW() - INTERVAL 1 HOUR
GROUP BY location
ORDER BY avg_congestion DESC;

-- Create stored procedures
DELIMITER //

CREATE PROCEDURE GetSystemHealth()
BEGIN
    SELECT 
        (SELECT COUNT(*) FROM city_operations WHERE severity >= 4) as critical_operations,
        (SELECT COUNT(*) FROM emergency_incidents WHERE status = 'ACTIVE') as active_emergencies,
        (SELECT COUNT(*) FROM iot_devices WHERE status = 'ACTIVE') as active_devices,
        (SELECT AVG(congestion_level) FROM traffic_data WHERE timestamp >= NOW() - INTERVAL 1 HOUR) as avg_congestion;
END //

CREATE PROCEDURE CleanupOldData()
BEGIN
    -- Remove traffic data older than 7 days
    DELETE FROM traffic_data WHERE timestamp < NOW() - INTERVAL 7 DAY;
    
    -- Remove resolved incidents older than 30 days
    DELETE FROM emergency_incidents WHERE status = 'RESOLVED' AND resolved_at < NOW() - INTERVAL 30 DAY;
    
    -- Remove old system metrics
    DELETE FROM system_metrics WHERE recorded_at < NOW() - INTERVAL 90 DAY;
    
    -- Remove expired predictions
    DELETE FROM ai_predictions WHERE valid_until < NOW();
END //

DELIMITER ;

-- Create events for automatic maintenance
CREATE EVENT IF NOT EXISTS cleanup_old_data
ON SCHEDULE EVERY 1 DAY
DO CALL CleanupOldData();

CREATE EVENT IF NOT EXISTS update_system_metrics
ON SCHEDULE EVERY 5 MINUTE
DO 
INSERT INTO system_metrics (metric_name, metric_value, unit, recorded_at)
VALUES 
('ACTIVE_CONNECTIONS', FLOOR(20 + RAND() * 30), 'connections', NOW()),
('DATA_THROUGHPUT', 500 + RAND() * 100, 'MB/s', NOW()),
('SYSTEM_LOAD', 30 + RAND() * 50, 'percent', NOW());

-- Create triggers for data integrity
DELIMITER //

CREATE TRIGGER before_emergency_insert
BEFORE INSERT ON emergency_incidents
FOR EACH ROW
BEGIN
    IF NEW.severity < 1 THEN
        SET NEW.severity = 1;
    ELSEIF NEW.severity > 5 THEN
        SET NEW.severity = 5;
    END IF;
END //

CREATE TRIGGER before_traffic_insert
BEFORE INSERT ON traffic_data
FOR EACH ROW
BEGIN
    IF NEW.congestion_level < 1 THEN
        SET NEW.congestion_level = 1;
    ELSEIF NEW.congestion_level > 10 THEN
        SET NEW.congestion_level = 10;
    END IF;
END //

DELIMITER ;

-- Create indexes for performance
CREATE INDEX idx_emergency_severity ON emergency_incidents(severity);
CREATE INDEX idx_operations_timestamp ON city_operations(timestamp);
CREATE INDEX idx_traffic_location_time ON traffic_data(location, timestamp);
CREATE INDEX idx_devices_last_seen ON iot_devices(last_seen);

-- Insert initial admin user (if needed for future authentication)
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('ADMIN', 'OPERATOR', 'VIEWER') DEFAULT 'OPERATOR',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    INDEX idx_username (username),
    INDEX idx_role (role)
);

-- Insert default admin user (password: admin123)
INSERT INTO users (username, email, password_hash, role) VALUES
('admin', 'admin@smartcity.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'ADMIN'),
('operator1', 'operator1@smartcity.com', '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'OPERATOR');

-- Create audit log table
CREATE TABLE IF NOT EXISTS audit_log (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT,
    action VARCHAR(100) NOT NULL,
    resource_type VARCHAR(50) NOT NULL,
    resource_id BIGINT,
    details JSON,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_action (action),
    INDEX idx_created_at (created_at),
    INDEX idx_user (user_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Create notification system tables
CREATE TABLE IF NOT EXISTS notifications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    type VARCHAR(50) NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    priority ENUM('LOW', 'MEDIUM', 'HIGH', 'CRITICAL') DEFAULT 'MEDIUM',
    status ENUM('UNREAD', 'READ', 'ARCHIVED') DEFAULT 'UNREAD',
    recipient_user_id BIGINT,
    related_resource_type VARCHAR(50),
    related_resource_id BIGINT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    read_at TIMESTAMP NULL,
    INDEX idx_priority (priority),
    INDEX idx_status (status),
    INDEX idx_created_at (created_at),
    FOREIGN KEY (recipient_user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Insert sample notifications
INSERT INTO notifications (type, title, message, priority, status) VALUES
('SYSTEM', 'System Startup', 'Smart City Management System started successfully', 'LOW', 'READ'),
('TRAFFIC', 'Heavy Traffic Alert', 'High congestion detected on Highway I-95 North', 'HIGH', 'UNREAD'),
('SECURITY', 'Security Patrol Update', 'Increased security presence in Central Park', 'MEDIUM', 'UNREAD');

-- Create API key management table
CREATE TABLE IF NOT EXISTS api_keys (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    api_key VARCHAR(64) UNIQUE NOT NULL,
    user_id BIGINT NOT NULL,
    permissions JSON NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    expires_at TIMESTAMP NULL,
    last_used TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_api_key (api_key),
    INDEX idx_user (user_id),
    INDEX idx_active (is_active),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Final status message
SELECT 'Smart City Database initialized successfully!' as status;
