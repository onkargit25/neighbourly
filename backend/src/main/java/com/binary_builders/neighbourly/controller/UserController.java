package com.binary_builders.neighbourly.controller;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/users")
public class UserController {
    
    

    //for getting a user's info
    @GetMapping("/{id}")
    public void getUser() {

    }

    //for updating a user's info
    @PutMapping("/{id}")
    public void updateUser() {

    }

   
    //for deleting a user profile
    @DeleteMapping("/{id}")
    public void deleteUser() {

    }
    
}
