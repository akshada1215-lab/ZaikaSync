package com.app.Service;

import java.util.List;

import com.app.DTO.AdminPaymentDYTO;
import com.app.DTO.PaymentRequestDTO;
import com.app.DTO.PaymentResponseDTO;

public interface PaymentService {

	PaymentResponseDTO processPayment(PaymentRequestDTO paymentRequest);

	List<AdminPaymentDYTO> getAllPayments();

}
