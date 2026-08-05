package com.binary_builders.neighbourly.controller;

import com.binary_builders.neighbourly.service.RequestService;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.binary_builders.neighbourly.model.Request;
import org.springframework.web.bind.annotation.PutMapping;



@RestController
@RequestMapping("/requests")
public class RequestController {
    
    private final RequestService requestService;


    public RequestController(RequestService requestService) {
        this.requestService = requestService;
    }

    //to create a new request
    @PostMapping
    public Request addRequest(@RequestBody Request request) {
        return requestService.createRequest(request);
    }

    //for getting info about a request
    @GetMapping("/{id}")
    public Request getRequest(@PathVariable Long id) {
        return requestService.getRequestById(id);
    }

   
    //for deleting a request
    @DeleteMapping("/{id}")
    public void deleteRequest(@PathVariable Long id) {
        requestService.deleteRequest(id);

    }

    //for getting list of items near you 
    @GetMapping("/{id}/nearby")
    public List<Request> getNearbyRequests(@PathVariable Long id) {
        return requestService.getNearbyRequests(id, (double)1);
    }

    @PutMapping("/{id}")
    public Request updateUser(@PathVariable Long id, @RequestBody Request updatedRequest) {

        return requestService.updateRequest(id, updatedRequest);
    }
    
}
