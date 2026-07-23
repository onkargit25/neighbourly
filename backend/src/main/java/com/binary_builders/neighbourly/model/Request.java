package com.binary_builders.neighbourly.model;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;


@Entity
public class Request {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private boolean isServed;
    private LocalDateTime createdAt;

    @Enumerated(EnumType.STRING)
    private RequestType type; 
    
    @ManyToOne
    @JoinColumn (name = "requester_id")
    private User requester;
}
