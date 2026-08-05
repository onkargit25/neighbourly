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

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setServed(boolean isServed) {
        this.isServed = isServed;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public void setType(RequestType type) {
        this.type = type;
    }

    public void setRequester(User requester) {
        this.requester = requester;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public boolean isServed() {
        return isServed;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public RequestType getType() {
        return type;
    }

    public User getRequester() {
        return requester;
    }
}
