package com.binary_builders.neighbourly.controller;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.binary_builders.neighbourly.model.Item;
import com.binary_builders.neighbourly.service.ItemService;


@RestController
@RequestMapping("/items")
public class ItemController {

    final ItemService itemService;

    ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    
    //for posting items online
    @PostMapping
    public Item createItem(@RequestBody Item item) {
        return itemService.createItem(item);
    }

    //for getting list of items near you 
    @GetMapping("/{id}/nearby")
    public List<Item> getNearbyItems(@PathVariable Long id) {
        return itemService.getNearbyItems(id, (double)1);
    }

    //for getting details of a certain item
    @GetMapping("/{id}")
    public Item getItem(@PathVariable Long id) {
        return itemService.getItemById(id);
    }

    //for deleting an item you put online
    @DeleteMapping("/{id}")
    public void deleteItem(@PathVariable Long id) {
        itemService.deleteItem(id);
    }
    
}
