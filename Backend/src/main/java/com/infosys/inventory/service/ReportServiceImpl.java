package com.infosys.inventory.service;

import com.infosys.inventory.dto.InventorySummaryResponse;
import com.infosys.inventory.model.Product;
import com.infosys.inventory.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReportServiceImpl implements ReportService {

    private final ProductRepository productRepository;

    public ReportServiceImpl(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public List<Product> getLowStockProducts(int threshold) {
        return productRepository.findByQuantityLessThanEqual(threshold);
    }

    @Override
    public InventorySummaryResponse getInventorySummary() {

        List<Product> products = productRepository.findAll();

        long totalProducts = products.size();
        long totalUnits = 0;
        double totalValue = 0;

        for (Product product : products) {
            totalUnits += product.getQuantity();
            totalValue += product.getQuantity() * product.getUnitPrice();
        }

        return new InventorySummaryResponse(
                totalProducts,
                totalUnits,
                totalValue
        );
    }
}
