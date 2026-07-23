package com.binary_builders.neighbourly.repository;

import com.binary_builders.neighbourly.model.Request;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RequestRepository extends JpaRepository<Request, Long> {

}