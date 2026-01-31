package com.app.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.Entity.Discount;
import com.app.Service.DiscountService;

@RestController
@RequestMapping("/admin")
public class DiscountController {

    @Autowired
    private DiscountService discountService;
    @PostMapping("/addDiscount")
    public ResponseEntity<String> addDiscount(
            @RequestParam("startPrice") Double startPrice,
            @RequestParam("endPrice") Double endPrice,
            @RequestParam("discountPercentage") Double discountPercentage) {

        discountService.applyDiscount(startPrice, endPrice, discountPercentage);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body("Discount added successfully");
    }

    

     @GetMapping("/active")
    public List<Discount> getDiscounts() {
        return discountService.getAllActiveDiscounts();
    }
    
    
     @GetMapping("/all")
    public List<Discount> getAllDiscounts() {
        return discountService.getAllDiscounts();
    }
     
     @PutMapping("/{discountId}/availability")
     public ResponseEntity<String> updateAvailability(
             @PathVariable Long discountId,
             @RequestParam Boolean isActive
     ) {
         discountService.updateAvailability(discountId, isActive);
         return ResponseEntity.ok("Discount availability updated successfully");
     }
 
    
    
}
