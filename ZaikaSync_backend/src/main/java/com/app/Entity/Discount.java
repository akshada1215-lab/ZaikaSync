package com.app.Entity;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Discounts")
	public class Discount {

	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long discountId;

	
	    private Double startPrice;

	    private Double endPrice;

	   
	    private Double discountPercentage;

	   
	    private Boolean isActive = true;


		public Long getDiscountId() {
			return discountId;
		}


		public void setDiscountId(Long discountId) {
			this.discountId = discountId;
		}


		public Double getStartPrice() {
			return startPrice;
		}


		public void setStartPrice(Double startPrice) {
			this.startPrice = startPrice;
		}


		public Double getEndPrice() {
			return endPrice;
		}


		public void setEndPrice(Double endPrice) {
			this.endPrice = endPrice;
		}


		public Double getDiscountPercentage() {
			return discountPercentage;
		}


		public void setDiscountPercentage(Double discountPercentage) {
			this.discountPercentage = discountPercentage;
		}


		public Boolean getIsActive() {
			return isActive;
		}


		public void setIsActive(Boolean isActive) {
			this.isActive = isActive;
		}
	    
	    
	    
}
