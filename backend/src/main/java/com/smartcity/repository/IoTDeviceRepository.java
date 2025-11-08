package com.smartcity.repository;

import com.smartcity.model.IoTDevice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface IoTDeviceRepository extends JpaRepository<IoTDevice, Long> {
    Optional<IoTDevice> findByDeviceId(String deviceId);
    List<IoTDevice> findByStatus(String status);
    List<IoTDevice> findByDeviceType(String deviceType);
}
