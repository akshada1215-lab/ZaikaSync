package com.app.DTO;

import java.time.LocalDate;

import com.app.Entity.OrderProducts;

public class AdminOrderDto {
	
	
	
	    private Long orderId;
	    private LocalDate orderDate;
	    private String userName;
	    
	    private String productName;
	    private int quantity;

	    public AdminOrderDto(OrderProducts orderProduct) {
	        this.orderId = orderProduct.getOrder().getOrderId();
	        this.orderDate = orderProduct.getOrder().getOrderDate();
	        this.userName = orderProduct.getOrder().getUser().getUserName();
	        this.productName = orderProduct.getProduct().getProductName();
	        this.quantity = orderProduct.getQuantity();
	    }

		public Long getOrderId() {
			return orderId;
		}

		public void setOrderId(Long orderId) {
			this.orderId = orderId;
		}

		public LocalDate getOrderDate() {
			return orderDate;
		}

		public void setOrderDate(LocalDate orderDate) {
			this.orderDate = orderDate;
		}

		public String getUserName() {
			return userName;
		}

		public void setUserName(String userName) {
			this.userName = userName;
		}

		public String getProductName() {
			return productName;
		}

		public void setProductName(String productName) {
			this.productName = productName;
		}

		public int getQuantity() {
			return quantity;
		}

		public void setQuantity(int quantity) {
			this.quantity = quantity;
		}

	    // Getters and setters
	
}
