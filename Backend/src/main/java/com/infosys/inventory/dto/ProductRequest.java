package com.infosys.inventory.dto;

public class ProductRequest {

    private String sku;
    private String name;
    private String category;
    private String supplier;
    private double unitPrice;
    private int quantity;
    

    public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public String getSku() {
        return sku;
    }

    public String getName() {
        return name;
    }

    public String getCategory() {
        return category;
    }

    public String getSupplier() {
        return supplier;
    }

    public double getUnitPrice() {
        return unitPrice;
    }

    public void setSku(String sku) {
        this.sku = sku;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public void setSupplier(String supplier) {
        this.supplier = supplier;
    }

    public void setUnitPrice(double unitPrice) {
        this.unitPrice = unitPrice;
    }

	
}
