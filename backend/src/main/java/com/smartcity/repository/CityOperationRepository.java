package com.smartcity.repository;

import com.smartcity.model.CityOperation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface CityOperationRepository extends JpaRepository<CityOperation, Long> {
    List<CityOperation> findByStatus(String status);
    List<CityOperation> findByOperationType(String operationType);

    @Query("SELECT co FROM CityOperation co WHERE co.timestamp >= :since ORDER BY co.timestamp DESC")
    List<CityOperation> findRecentOperations(LocalDateTime since);

    List<CityOperation> findBySeverityGreaterThanEqual(Integer severity);
}
