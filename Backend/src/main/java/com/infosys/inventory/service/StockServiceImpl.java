package com.infosys.inventory.service;

import com.infosys.inventory.dto.StockUpdateRequest;
import com.infosys.inventory.model.Product;
import com.infosys.inventory.model.StockTransaction;
import com.infosys.inventory.model.StockType;
import com.infosys.inventory.repository.ProductRepository;
import com.infosys.inventory.repository.StockTransactionRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class StockServiceImpl implements StockService {

    private final ProductRepository productRepository;
    private final StockTransactionRepository stockRepo;

    public StockServiceImpl(ProductRepository productRepository,
                            StockTransactionRepository stockRepo) {
        this.productRepository = productRepository;
        this.stockRepo = stockRepo;
    }

    @Override
    @Transactional
    public void updateStock(StockUpdateRequest request) {

        Product product = productRepository.findBySku(request.getSku())
                .orElseThrow(() -> new IllegalArgumentException("Product not found"));

        int qty = request.getQuantity();

        if (qty <= 0) {
            throw new IllegalArgumentException("Quantity must be greater than zero");
        }

        if (request.getStockType() == StockType.STOCK_OUT &&
                product.getQuantity() < qty) {
            throw new IllegalArgumentException("Insufficient stock");
        }

        // Update product quantity
        if (request.getStockType() == StockType.STOCK_IN) {
            product.setQuantity(product.getQuantity() + qty);
        } else {
            product.setQuantity(product.getQuantity() - qty);
        }

        productRepository.save(product);

        // Save transaction
        StockTransaction transaction =
                new StockTransaction(product.getSku(), qty, request.getStockType());

        stockRepo.save(transaction);
    }

    @Override
    public List<StockTransaction> getStockHistory(String sku) {
        return stockRepo.findBySku(sku);
    }
}
