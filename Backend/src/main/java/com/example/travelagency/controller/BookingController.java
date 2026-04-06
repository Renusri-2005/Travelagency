package com.example.travelagency.controller;

import org.springframework.web.bind.annotation.*;
import com.example.travelagency.model.Booking;
import com.example.travelagency.repository.BookingRepository;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingRepository repo;

    public BookingController(BookingRepository repo) {
        this.repo = repo;
    }

    @PostMapping
    public Booking bookPackage(@RequestBody Booking booking) {
        return repo.save(booking);
    }
}