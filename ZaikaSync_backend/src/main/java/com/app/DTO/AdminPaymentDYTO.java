package com.app.DTO;

import java.time.LocalDate;

import com.app.Entity.Payment;

public class AdminPaymentDYTO {

	private Long paymentId;
	private Long orderId;
	private LocalDate orderDate;
	private String userName;
	private String paymentStatus;
	private Double amount;

	public AdminPaymentDYTO(Payment payment) {
	        this.paymentId = payment.getId();
	        this.orderId = payment.getOrder().getOrderId();
	        this.orderDate = payment.getOrder().getOrderDate();
	        this.userName = payment.getOrder().getUser().getUserName(); // Assuming User has a 'fullName' field
	        this.paymentStatus = payment.getPaymentStatus();
	        this.amount = payment.getAmount();
	    }

	// Getters and Setters
	public Long getPaymentId() {
		return paymentId;
	}

	public void setPaymentId(Long paymentId) {
		this.paymentId = paymentId;
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

	public String getPaymentStatus() {
		return paymentStatus;
	}

	public void setPaymentStatus(String paymentStatus) {
		this.paymentStatus = paymentStatus;
	}

	public Double getAmount() {
		return amount;
	}

	public void setAmount(Double amount) {
		this.amount = amount;
	}

}
