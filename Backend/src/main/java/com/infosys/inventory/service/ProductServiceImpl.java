package com.infosys.inventory.service;

import com.infosys.inventory.dto.ProductUpdateRequest;
import com.infosys.inventory.model.Product;
import com.infosys.inventory.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    public ProductServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public Product createProduct(Product product) {

        if (product.getSku() == null || product.getSku().isBlank()) {
            throw new IllegalArgumentException("SKU cannot be empty");
        }

        if (productRepository.existsBySku(product.getSku())) {
            throw new IllegalStateException("Product with this SKU already exists");
        }
        if (product.getQuantity() < 0) {
            throw new IllegalArgumentException("Quantity cannot be negative");
        }
        

        return productRepository.save(product);
    }

    @Override
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @Override
    public Product getBySku(String sku) {
        return productRepository.findBySku(sku)
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));
    }

    @Override
    public List<Product> searchByName(String name) {
        return productRepository.findByNameContainingIgnoreCase(name);
    }
    @Override
    public void deleteBySku(String sku) {

        Product product = productRepository.findBySku(sku)
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));

        productRepository.delete(product);
    }
    @Override
    public void updateProduct(String sku, ProductUpdateRequest request) {

        Product product = productRepository.findBySku(sku)
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));

        if (request.getName() != null && !request.getName().isBlank()) {
            product.setName(request.getName());
        }

        if (request.getCategory() != null) {
            product.setCategory(request.getCategory());
        }

        if (request.getSupplier() != null) {
            product.setSupplier(request.getSupplier());
        }

        if (request.getUnitPrice() != null) {
            if (request.getUnitPrice() < 0) {
                throw new IllegalArgumentException("Unit price cannot be negative");
            }
            product.setUnitPrice(request.getUnitPrice());
        }

        if (request.getQuantity() != null) {
            if (request.getQuantity() < 0) {
                throw new IllegalArgumentException("Quantity cannot be negative");
            }
            product.setQuantity(request.getQuantity());
        }

        productRepository.save(product);
    }


}
