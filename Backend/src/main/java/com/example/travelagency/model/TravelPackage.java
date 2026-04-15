package com.example.travelagency.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class TravelPackage {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String duration;
    private double price;
}
