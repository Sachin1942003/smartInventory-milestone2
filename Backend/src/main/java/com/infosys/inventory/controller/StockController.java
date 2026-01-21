package com.infosys.inventory.controller;

import com.infosys.inventory.dto.StockUpdateRequest;
import com.infosys.inventory.model.StockTransaction;
import com.infosys.inventory.service.StockService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/stock")
public class StockController {

    private final StockService stockService;

    public StockController(StockService stockService) {
        this.stockService = stockService;
    }

    
    @PreAuthorize("hasAnyRole('ADMIN','EMPLOYEE')")
    @PostMapping("/update")
    public ResponseEntity<String> updateStock(@RequestBody StockUpdateRequest request) {
        stockService.updateStock(request);
        return ResponseEntity.ok("Stock updated successfully");
    }

    
    @PreAuthorize("hasAnyRole('ADMIN','EMPLOYEE')")
    @GetMapping("/history/{sku}")
    public ResponseEntity<List<StockTransaction>> history(@PathVariable String sku) {
        return ResponseEntity.ok(stockService.getStockHistory(sku));
    }
}
