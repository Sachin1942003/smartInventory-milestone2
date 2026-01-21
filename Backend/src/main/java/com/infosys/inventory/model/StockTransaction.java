package com.infosys.inventory.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "stock_transactions")
public class StockTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String sku;

    private int quantity;

    @Enumerated(EnumType.STRING)
    private StockType stockType;

    private LocalDateTime timestamp;

    public StockTransaction() {}

    public StockTransaction(String sku, int quantity, StockType stockType) {
        this.sku = sku;
        this.quantity = quantity;
        this.stockType = stockType;
        this.timestamp = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public String getSku() {
        return sku;
    }

    public int getQuantity() {
        return quantity;
    }

    public StockType getStockType() {
        return stockType;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }
}
