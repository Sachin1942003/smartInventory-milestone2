package com.infosys.inventory.service;

import com.infosys.inventory.dto.InventorySummaryResponse;
import com.infosys.inventory.model.Product;

import java.util.List;

public interface ReportService {

    List<Product> getLowStockProducts(int threshold);

    InventorySummaryResponse getInventorySummary();
}
