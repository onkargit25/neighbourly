package com.binary_builders.neighbourly.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.binary_builders.neighbourly.model.User;
import com.binary_builders.neighbourly.service.AuthService;
import com.binary_builders.neighbourly.service.UserService;



@RestController
@RequestMapping("/auth")
public class AuthController {

    private final UserService userService;
    private final AuthService authService;
    
    @PostMapping("/register")
    public User register(@RequestBody User user) {

        return userService.createUser(user);
        
    }

    @PostMapping("/login")
    public User login(@RequestBody User user) {
        return authService.login(user);
}

    public AuthController(UserService userService, AuthService authService) {
        this.userService = userService;
        this.authService = authService;
    }
}
