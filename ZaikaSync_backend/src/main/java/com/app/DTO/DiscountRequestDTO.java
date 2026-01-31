package com.app.DTO;

public class DiscountRequestDTO {
	  private Double startPrice;
	    private Double endPrice;
	    private Double discountPercentage;
	    
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
	    
}
