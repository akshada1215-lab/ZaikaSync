package com.app.DTO;

public class PaymentResponseDTO {
	private Long paymentId;
	private Long orderId;
	private Double amount;
	private String status;

	public PaymentResponseDTO(Long paymentId, Long orderId, Double amount, String status) {
		this.paymentId = paymentId;
		this.orderId = orderId;
		this.amount = amount;
		this.status = status;
	}

	public Long getPaymentId() {
		return paymentId;
	}

	public Long getOrderId() {
		return orderId;
	}

	public Double getAmount() {
		return amount;
	}

	public String getStatus() {
		return status;
	}
}