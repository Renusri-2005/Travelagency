package com.example.travelagency.controller;

import org.springframework.web.bind.annotation.*;
import com.example.travelagency.model.Contact;
import com.example.travelagency.repository.ContactRepository;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/contact")
public class ContactController {

    private final ContactRepository repo;

    public ContactController(ContactRepository repo) {
        this.repo = repo;
    }

    @PostMapping
    public Contact saveMessage(@RequestBody Contact contact) {
        return repo.save(contact);
    }
}