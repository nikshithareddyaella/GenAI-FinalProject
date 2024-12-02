package com.smile.rest1.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class ChartData {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String year;
    private String innovation;
    private String strategy;
    private String focusArea;
    private Double investment;
    private String impactArea;
    private String stakeholders;
    private String keyMetrics;
    private String priorityLevel;

    // Getters and setters
}
