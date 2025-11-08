package com.smartcity.service;

import com.smartcity.model.IoTDevice;
import com.smartcity.repository.IoTDeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class IoTDataService {

    @Autowired
    private IoTDeviceRepository repository;

    public List<IoTDevice> getAllDevices() {
        return repository.findAll();
    }

    public String getDeviceStatus(String deviceId) {
        Optional<IoTDevice> device = repository.findByDeviceId(deviceId);
        return device.map(IoTDevice::getStatus).orElse("NOT_FOUND");
    }

    public IoTDevice registerDevice(IoTDevice device) {
        device.setLastSeen(LocalDateTime.now());
        return repository.save(device);
    }

    // Additional methods for IoT data processing
}
