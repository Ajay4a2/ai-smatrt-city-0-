package com.smartcity.controller;

import com.smartcity.model.IoTDevice;
import com.smartcity.service.IoTDataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/iot")
@CrossOrigin(origins = "*")
public class IoTDeviceController {

    @Autowired
    private IoTDataService service;

    @GetMapping("/devices")
    public List<IoTDevice> getAllDevices() {
        return service.getAllDevices();
    }

    @GetMapping("/devices/{id}/status")
    public String getDeviceStatus(@PathVariable String id) {
        return service.getDeviceStatus(id);
    }

    @PostMapping("/devices")
    public IoTDevice registerDevice(@RequestBody IoTDevice device) {
        return service.registerDevice(device);
    }
}
