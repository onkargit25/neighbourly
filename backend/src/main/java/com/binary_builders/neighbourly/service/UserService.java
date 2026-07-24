package com.binary_builders.neighbourly.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.binary_builders.neighbourly.model.User;
import com.binary_builders.neighbourly.repository.UserRepository;

@Service
public class UserService {
    
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow();
    }

    public void deleteUser(Long id) {

        User u = (userRepository.findById(id)).orElseThrow();
        userRepository.delete(u);
    }

    public User updateUser(Long id, User updatedUser) {

        User existingUser = userRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("User not found"));

        existingUser.setName(updatedUser.getName());
        existingUser.setEmail(updatedUser.getEmail());
        existingUser.setPhoneNumber(updatedUser.getPhoneNumber());
        existingUser.setLatitude(updatedUser.getLatitude());
        existingUser.setLongitude(updatedUser.getLongitude());

        return userRepository.save(existingUser);
    }
}
