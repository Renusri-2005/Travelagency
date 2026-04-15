package com.example.travelagency.controller;

import org.springframework.web.bind.annotation.*;
import java.util.List;
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

    @GetMapping
    public List<Booking> getAllBookings() {
        return repo.findAll();
    }

    @PostMapping
    public Booking bookPackage(@RequestBody Booking booking) {
        return repo.save(booking);
    }

    @DeleteMapping("/{id}")
    public void deleteBooking(@PathVariable Long id) {
        repo.deleteById(id);
    }
}