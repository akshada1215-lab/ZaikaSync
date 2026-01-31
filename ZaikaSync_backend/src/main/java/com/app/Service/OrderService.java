package com.app.Service;

import java.util.List;

import com.app.DTO.AdminOrderDto;
import com.app.DTO.CreateOrderRequest;
import com.app.DTO.OrderDTO;
import com.app.DTO.OrderDtoResponse;

public interface OrderService {

	
	OrderDTO createOrder(CreateOrderRequest request);

	List<OrderDtoResponse> getOrdersByUserId(Long userId);

	List<AdminOrderDto> getAllOrders();

	void updateOrderStatus(Long orderId, String status);

	

	
}
