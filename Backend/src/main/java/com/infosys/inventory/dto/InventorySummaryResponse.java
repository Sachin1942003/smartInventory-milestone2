package com.infosys.inventory.dto;

public class InventorySummaryResponse {

    private long totalProducts;
    private long totalUnits;
    private double totalInventoryValue;

    public InventorySummaryResponse(long totalProducts, long totalUnits, double totalInventoryValue) {
        this.totalProducts = totalProducts;
        this.totalUnits = totalUnits;
        this.totalInventoryValue = totalInventoryValue;
    }

    public long getTotalProducts() {
        return totalProducts;
    }

    public long getTotalUnits() {
        return totalUnits;
    }

    public double getTotalInventoryValue() {
        return totalInventoryValue;
    }
}
