package com.smartcity.service;

import com.smartcity.model.TrafficData;
import com.smartcity.repository.TrafficDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Random;

@Service
public class TrafficService {

    @Autowired
    private TrafficDataRepository repository;

    @Autowired
    private AIService aiService;

    private Random random = new Random();
    private String[] locations = {"Main St & 1st Ave", "Central Square", "Highway I-95", "Bridge Entrance", "Tunnel Exit"};

    public List<TrafficData> getCurrentTraffic() {
        return repository.findLatestTrafficData();
    }

    public List<TrafficData> getTrafficHistory(String location) {
        return repository.findByLocation(location);
    }

    @Scheduled(fixedRate = 30000) // Every 30 seconds
    public void updateTrafficData() {
        for (String location : locations) {
            TrafficData data = new TrafficData();
            data.setLocation(location);
            data.setCongestionLevel(random.nextInt(10) + 1);
            data.setAverageSpeed(60 - (data.getCongestionLevel() * 5) + random.nextDouble() * 10);
            data.setVehicleCount(100 + random.nextInt(900));
            data.setTimestamp(LocalDateTime.now());
            data.setLatitude(40.7128 + (random.nextDouble() - 0.5) * 0.1);
            data.setLongitude(-74.0060 + (random.nextDouble() - 0.5) * 0.1);

            repository.save(data);
        }
    }

    public String predictTraffic(String location) {
        return aiService.predictTraffic(location);
    }

    public void initializeSampleData() {
        for (int i = 0; i < 50; i++) {
            for (String location : locations) {
                TrafficData data = new TrafficData();
                data.setLocation(location);
                data.setCongestionLevel(random.nextInt(10) + 1);
                data.setAverageSpeed(60 - (data.getCongestionLevel() * 5) + random.nextDouble() * 10);
                data.setVehicleCount(100 + random.nextInt(900));
                data.setTimestamp(LocalDateTime.now().minusHours(random.nextInt(24)));
                data.setLatitude(40.7128 + (random.nextDouble() - 0.5) * 0.1);
                data.setLongitude(-74.0060 + (random.nextDouble() - 0.5) * 0.1);

                repository.save(data);
            }
        }
    }
}
