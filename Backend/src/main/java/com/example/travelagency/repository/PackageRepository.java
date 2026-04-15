package com.example.travelagency.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.travelagency.model.TravelPackage;

public interface PackageRepository extends JpaRepository<TravelPackage, Long> {
}
