package com.binary_builders.neighbourly.repository;

import com.binary_builders.neighbourly.model.Item;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ItemRepository extends JpaRepository<Item, Long> {

}