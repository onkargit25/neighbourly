package com.binary_builders.neighbourly.service;

import org.springframework.stereotype.Service;
import com.binary_builders.neighbourly.repository.RequestRepository;

@Service
public class RequestService {
    
    private final RequestRepository requestRepository;

    public RequestService(RequestRepository requestRepository) {
        this.requestRepository = requestRepository;
    }
}
