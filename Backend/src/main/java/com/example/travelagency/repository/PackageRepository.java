package com.example.travelagency.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.travelagency.model.Package;

public interface PackageRepository extends JpaRepository<Package, Long> {
}