package com.infosys.inventory.service;

import com.infosys.inventory.dto.StockUpdateRequest;
import com.infosys.inventory.model.StockTransaction;

import java.util.List;

public interface StockService {

    void updateStock(StockUpdateRequest request);

    List<StockTransaction> getStockHistory(String sku);
}
