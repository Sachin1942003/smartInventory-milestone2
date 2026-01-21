package com.infosys.inventory.service;

import com.infosys.inventory.dto.ProductUpdateRequest;
import com.infosys.inventory.model.Product;

import java.util.List;

public interface ProductService {

    Product createProduct(Product product);

    List<Product> getAllProducts();

    Product getBySku(String sku);

    List<Product> searchByName(String name);
    void deleteBySku(String sku);
    void updateProduct(String sku, ProductUpdateRequest request);


}
