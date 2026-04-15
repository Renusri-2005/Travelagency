package com.example.travelagency.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.example.travelagency.model.TravelPackage;
import com.example.travelagency.repository.PackageRepository;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/packages")
public class PackageController {

    private final PackageRepository repo;

    public PackageController(PackageRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<TravelPackage> getAllPackages() {
        return repo.findAll();
    }

    @PostMapping
    public TravelPackage addPackage(@RequestBody TravelPackage p) {
        return repo.save(p);
    }
}
