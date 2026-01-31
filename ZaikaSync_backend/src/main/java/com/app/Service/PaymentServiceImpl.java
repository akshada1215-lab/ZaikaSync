package com.app.Service;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.DTO.AdminPaymentDYTO;
import com.app.DTO.PaymentRequestDTO;
import com.app.DTO.PaymentResponseDTO;
import com.app.Entity.Order;
import com.app.Entity.Payment;
import com.app.Exception.ResourceNotFoundException;
import com.app.Repository.OrderRepository;
import com.app.Repository.PaymentRepository;

@Service
@Transactional
public class PaymentServiceImpl implements PaymentService {

	@Autowired
	private PaymentRepository paymentRepository;

	@Autowired
	private OrderRepository orderRepository;

	@Transactional
	public PaymentResponseDTO processPayment(PaymentRequestDTO paymentRequest) {
		// Fetch the Order entity using orderId
		Order order = orderRepository.findById(paymentRequest.getOrderId()).orElseThrow(
				() -> new ResourceNotFoundException("Order not found with ID: " + paymentRequest.getOrderId()));

		// Simulate payment processing logic (e.g., third-party API integration)
		// String paymentStatus = processPaymentWithGateway(paymentRequest.getAmount());

		// Create a new Payment entity
		Payment payment = new Payment();
		payment.setOrder(order);
		payment.setAmount(paymentRequest.getAmount());
		payment.setPaymentStatus("PAID");

		// Save payment record in the database
		Payment savedPayment = paymentRepository.save(payment);

		// Return response DTO
		return new PaymentResponseDTO(savedPayment.getId(), savedPayment.getOrder().getOrderId(), savedPayment.getAmount(),
				savedPayment.getPaymentStatus());
	}
	
	public List<AdminPaymentDYTO> getAllPayments() {
	    List<Payment> payments = paymentRepository.findAll();
	    return payments.stream()
	                   .map(AdminPaymentDYTO::new)  // Convert each Payment to PaymentDTO
	                   .collect(Collectors.toList());
	}

}
