package com.example.travelagency.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.travelagency.model.Contact;

public interface ContactRepository extends JpaRepository<Contact, Long> {
}