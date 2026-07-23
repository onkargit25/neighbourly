package com.binary_builders.neighbourly.repository;

import com.binary_builders.neighbourly.model.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User, Long> {

}