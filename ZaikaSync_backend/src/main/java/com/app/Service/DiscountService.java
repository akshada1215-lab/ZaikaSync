package com.app.Service;

import java.util.List;

import com.app.Entity.Discount;

public interface DiscountService {

	 

	   // Discount getDiscountForAmount(Double totalAmount);
	 List<Discount> getAllActiveDiscounts();

	

	 void applyDiscount(Double startPrice, Double endPrice, Double discountPercentage);



	 List<Discount> getAllDiscounts();



	 void updateAvailability(Long discountId, Boolean isActive);
}
