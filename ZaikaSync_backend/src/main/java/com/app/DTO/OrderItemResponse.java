package com.app.DTO;

import java.time.LocalDate;
import java.util.Base64;

import com.app.Entity.OrderProducts;

public class OrderItemResponse {

	private Long orderId;
	private LocalDate orderDate;
	private String productName;
	private String productImage; // Base64 encoded image
	private double productPrice;
	private int quantity;

	public OrderItemResponse(OrderProducts orderProduct) {
		this.orderId = orderProduct.getOrder().getOrderId();
		this.orderDate = orderProduct.getOrder().getOrderDate();
		this.productName = orderProduct.getProduct().getProductName();
		this.productPrice = orderProduct.getProduct().getPrice();
		this.quantity = orderProduct.getQuantity();
		if (orderProduct.getProduct().getProductImage() != null) {
			this.productImage = encodeImageToBase64(orderProduct.getProduct().getProductImage());
		}
	}

	// Method to encode byte[] image to Base64 string
	private String encodeImageToBase64(byte[] imageBytes) {
		return Base64.getEncoder().encodeToString(imageBytes);
	}

	// Getters and Setters
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

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getProductImage() {
		return productImage;
	}

	public void setProductImage(String productImage) {
		this.productImage = productImage;
	}

	public double getProductPrice() {
		return productPrice;
	}

	public void setProductPrice(double productPrice) {
		this.productPrice = productPrice;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

}
