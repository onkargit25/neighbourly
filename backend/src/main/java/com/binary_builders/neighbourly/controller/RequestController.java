package com.binary_builders.neighbourly.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/requests")
public class RequestController {
    
    //to create a new request
    @PostMapping
    public void addRequest() {

    }

    //for getting info about a request
    @GetMapping("/{id}")
    public void getRequest() {

    }

   
    //for deleting a request
    @DeleteMapping("/{id}")
    public void deleteRequest() {

    }
    
}
