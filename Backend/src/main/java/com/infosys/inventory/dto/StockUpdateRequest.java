package com.infosys.inventory.dto;

import com.infosys.inventory.model.StockType;

public class StockUpdateRequest {

    private String sku;
    private int quantity;
    private StockType stockType;

    public String getSku() {
        return sku;
    }

    public int getQuantity() {
        return quantity;
    }
    public void setSku(String sku) {
        this.sku = sku;
    }
    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

	public StockType getStockType() {
		return stockType;
	}

	public void setStockType(StockType stockType) {
		this.stockType = stockType;
	}
    

    
}
