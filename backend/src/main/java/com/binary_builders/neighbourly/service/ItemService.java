package com.binary_builders.neighbourly.service;

import org.springframework.stereotype.Service;
import com.binary_builders.neighbourly.repository.ItemRepository;

@Service
public class ItemService {
    
    private final ItemRepository itemRepository;

    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }
}
