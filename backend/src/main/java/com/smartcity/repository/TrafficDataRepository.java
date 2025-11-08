package com.smartcity.repository;

import com.smartcity.model.TrafficData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TrafficDataRepository extends JpaRepository<TrafficData, Long> {

    @Query("SELECT td FROM TrafficData td WHERE td.timestamp = (SELECT MAX(td2.timestamp) FROM TrafficData td2 WHERE td2.location = td.location)")
    List<TrafficData> findLatestTrafficData();

    List<TrafficData> findByLocation(String location);

    @Query("SELECT td FROM TrafficData td WHERE td.timestamp >= :since ORDER BY td.timestamp DESC")
    List<TrafficData> findRecentTrafficData(LocalDateTime since);
}
