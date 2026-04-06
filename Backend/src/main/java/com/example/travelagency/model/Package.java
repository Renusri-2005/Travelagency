package com.example.travelagency.model;

import jakarta.persistence.*;

@Entity
public class Package {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String duration;
    private double price;

    // getters & setters
}