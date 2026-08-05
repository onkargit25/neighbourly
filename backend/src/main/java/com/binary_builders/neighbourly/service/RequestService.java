package com.binary_builders.neighbourly.service;

import java.util.List;
import org.springframework.stereotype.Service;
import com.binary_builders.neighbourly.model.Request;
import com.binary_builders.neighbourly.model.User;
import com.binary_builders.neighbourly.repository.RequestRepository;
import com.binary_builders.neighbourly.repository.UserRepository;

import java.time.LocalDateTime;

@Service
public class RequestService {

    private final RequestRepository requestRepository;
    private final UserRepository userRepository;

    public RequestService(RequestRepository requestRepository, UserRepository userRepository) {
        this.requestRepository = requestRepository;
        this.userRepository = userRepository;
    }

    public Request createRequest(Request request) {
        request.setCreatedAt(LocalDateTime.now());
        return requestRepository.save(request);
    }

    public List<Request> getAllRequests() {
        return requestRepository.findAll();
    }

    public Request getRequestById(Long id) {
        return requestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));
    }

    public void deleteRequest(Long id) {
        Request request = requestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        requestRepository.delete(request);
    }

    public Request updateRequest(Long id, Request updatedRequest) {

        Request existingRequest = requestRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Request not found"));

        existingRequest.setTitle(updatedRequest.getTitle());
        existingRequest.setDescription(updatedRequest.getDescription());
        existingRequest.setServed(updatedRequest.isServed());
        existingRequest.setType(updatedRequest.getType());

        return requestRepository.save(existingRequest);
    }

    public List<Request> getNearbyRequests(Long userId, Double radius) {

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        double userLatitudeRad = Math.toRadians(user.getLatitude());
        double userLongitudeRad = Math.toRadians(user.getLongitude());

        List<Request> FullList = requestRepository.findAll();
        List<Request> NearbyRequests = new java.util.ArrayList<>();

        for (Request req : FullList) {
            User requester = req.getRequester();
            if (requester != null && requester.getLatitude() != null && requester.getLongitude() != null) {
                double requesterLatitudeRad = Math.toRadians(requester.getLatitude());
                double requesterLongitudeRad = Math.toRadians(requester.getLongitude());

                double deltaLatitude = requesterLatitudeRad - userLatitudeRad;
                double deltaLongitude = requesterLongitudeRad - userLongitudeRad;

                double a = Math.sin(deltaLatitude / 2) * Math.sin(deltaLatitude / 2)
                        + Math.cos(userLatitudeRad) * Math.cos(requesterLatitudeRad)
                        * Math.sin(deltaLongitude / 2) * Math.sin(deltaLongitude / 2);

                double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                double earthRadius = 6371; // Radius of the Earth in kilometers
                double distance = earthRadius * c;

                if (distance <= radius) {
                    NearbyRequests.add(req);
                }
            }
        }

        return NearbyRequests;
    }
}