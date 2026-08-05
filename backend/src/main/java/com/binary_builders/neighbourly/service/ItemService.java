package com.binary_builders.neighbourly.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.binary_builders.neighbourly.model.Item;
import com.binary_builders.neighbourly.model.User;
import com.binary_builders.neighbourly.repository.ItemRepository;
import com.binary_builders.neighbourly.repository.UserRepository;

@Service
public class ItemService {
    
    private final ItemRepository itemRepository;
    private final UserRepository userRepository;

    public ItemService(ItemRepository itemRepository, UserRepository userRepository) {
        this.itemRepository = itemRepository;
        this.userRepository = userRepository;
    }

    public Item createItem(Item item) {
        return itemRepository.save(item);
    }

    public Item getItemById(Long id) {
        return itemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found"));
    }

    public void deleteItem(Long id) {
        Item item = itemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        itemRepository.delete(item);
    }

    public Item updateItem(Long id, Item updatedItem) {

        Item existingItem = itemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        existingItem.setName(updatedItem.getName());
        existingItem.setDescription(updatedItem.getDescription());
        existingItem.setAvailable(updatedItem.isAvailable());

        return itemRepository.save(existingItem);
    }

    public List<Item> getAllItems() {
        return itemRepository.findAll();
    }

    public List<Item> getNearbyItems(Long UserId, Double radius) {

        User user = userRepository.findById(UserId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        double userLatitude = user.getLatitude();
        double userLongitude = user.getLongitude();

        List<Item> FullList = itemRepository.findAll();
        List<Item> NearbyItems = new java.util.ArrayList<>();

        for (Item item : FullList) {
            User owner = item.getOwner();
            if (owner != null && owner.getLatitude() != null && owner.getLongitude() != null) {
                double ownerLatitudeRad = Math.toRadians(owner.getLatitude());
                double ownerLongitudeRad = Math.toRadians(owner.getLongitude());
                double userLatitudeRad = Math.toRadians(userLatitude);
                double userLongitudeRad = Math.toRadians(userLongitude);

                double deltaLatitude = ownerLatitudeRad - userLatitudeRad;
                double deltaLongitude = ownerLongitudeRad - userLongitudeRad;

                double a = Math.sin(deltaLatitude / 2) * Math.sin(deltaLatitude / 2)
                        + Math.cos(userLatitudeRad) * Math.cos(ownerLatitudeRad)
                        * Math.sin(deltaLongitude / 2) * Math.sin(deltaLongitude / 2);

                double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                double earthRadius = 6371; // Radius of the Earth in kilometers
                double distance = earthRadius * c;

                if (distance <= radius) {
                    NearbyItems.add(item);
                }
            }
        }

        return NearbyItems;
    }
}
