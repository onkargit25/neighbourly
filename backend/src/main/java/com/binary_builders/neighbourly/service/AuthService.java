package com.binary_builders.neighbourly.service;

import com.binary_builders.neighbourly.model.User;
import com.binary_builders.neighbourly.repository.UserRepository;

public class AuthService {

    public final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    
    public User login(User loginUser) {

        User user = userRepository.findByEmail(loginUser.getEmail())
            .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getPassword().equals(loginUser.getPassword())) {
        throw new RuntimeException("Invalid password");
    }

    return user;
}
}
