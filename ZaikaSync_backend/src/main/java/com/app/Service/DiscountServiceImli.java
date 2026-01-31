package com.app.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.Entity.Discount;
import com.app.Repository.DiscountRepository;
@Service
public class DiscountServiceImli implements DiscountService {

	  @Autowired
	    private DiscountRepository discountRepository;

	  @Override
	    public void applyDiscount( Double startPrice, Double endPrice, Double discountPercentage) {

	        

	        Discount discount = new Discount();
	        discount.setStartPrice(startPrice);
	        discount.setEndPrice(endPrice);
	        discount.setDiscountPercentage(discountPercentage);
	        discount.setIsActive(true);

	        // JPA save
	        discountRepository.save(discount);
	    }

	    @Override
	    public List<Discount> getAllActiveDiscounts() {
	        return discountRepository.findByIsActiveTrue();
	    }

		@Override
		public List<Discount> getAllDiscounts(){
			return discountRepository.findAll();
		}
		
		 @Override
		    public void updateAvailability(Long discountId, Boolean isActive) {

		        Discount discount = discountRepository.findById(discountId)
		                .orElseThrow(() -> new RuntimeException("Discount not found"));

		        discount.setIsActive(isActive);
		        discountRepository.save(discount);
		    }

		
}
