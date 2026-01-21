package com.infosys.inventory.repository;

import com.infosys.inventory.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {

    Optional<Product> findBySku(String sku);

    List<Product> findByNameContainingIgnoreCase(String name);
    List<Product> findByQuantityLessThanEqual(int quantity);
    void deleteBySku(String sku);


    boolean existsBySku(String sku);
}
