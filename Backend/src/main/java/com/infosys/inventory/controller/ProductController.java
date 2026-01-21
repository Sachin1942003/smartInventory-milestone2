package com.infosys.inventory.controller;

import com.infosys.inventory.dto.ProductRequest;
import com.infosys.inventory.dto.ProductUpdateRequest;
import com.infosys.inventory.model.Product;
import com.infosys.inventory.service.ProductService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    
    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody ProductRequest request) {

        Product product = new Product();
        product.setSku(request.getSku());
        product.setName(request.getName());
        product.setCategory(request.getCategory());
        product.setSupplier(request.getSupplier());
        product.setUnitPrice(request.getUnitPrice());
        product.setQuantity(request.getQuantity());

        return ResponseEntity.ok(productService.createProduct(product));
    }

    
    @PreAuthorize("hasAnyRole('ADMIN','EMPLOYEE')")
    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    // ADMIN + EMPLOYEE search by SKU
    @PreAuthorize("hasAnyRole('ADMIN','EMPLOYEE')")
    @GetMapping("/sku/{sku}")
    public ResponseEntity<Product> getBySku(@PathVariable String sku) {
        return ResponseEntity.ok(productService.getBySku(sku));
    }

    // ADMIN + EMPLOYEE  search by name
    @PreAuthorize("hasAnyRole('ADMIN','EMPLOYEE')")
    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchByName(@RequestParam String name) {
        return ResponseEntity.ok(productService.searchByName(name));
    }
    
    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{sku}")
    public ResponseEntity<String> deleteProduct(@PathVariable String sku) {
        productService.deleteBySku(sku);
        return ResponseEntity.ok("Product deleted successfully");
    }
    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{sku}")
    public ResponseEntity<String> updateProduct(
            @PathVariable String sku,
            @RequestBody ProductUpdateRequest request) {

        productService.updateProduct(sku, request);
        return ResponseEntity.ok("Product updated successfully");
    }


}
