package com.infosys.inventory.controller;

import com.infosys.inventory.dto.InventorySummaryResponse;
import com.infosys.inventory.model.Product;
import com.infosys.inventory.service.ReportService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reports")
public class ReportController {

    private final ReportService reportService;

    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/low-stock")
    public ResponseEntity<List<Product>> lowStock(
            @RequestParam(defaultValue = "5") int threshold) {

        return ResponseEntity.ok(
                reportService.getLowStockProducts(threshold)
        );
    }

    
    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/summary")
    public ResponseEntity<InventorySummaryResponse> summary() {

        return ResponseEntity.ok(
                reportService.getInventorySummary()
        );
    }
}
