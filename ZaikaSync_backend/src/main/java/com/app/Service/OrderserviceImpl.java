package com.app.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.DTO.AdminOrderDto;
import com.app.DTO.CreateOrderRequest;
import com.app.DTO.OrderDTO;
import com.app.DTO.OrderDtoResponse;
import com.app.DTO.OrderItemDTO;
import com.app.Entity.Order;
import com.app.Entity.OrderProducts;
import com.app.Entity.Product;
import com.app.Entity.User;
import com.app.Repository.CartRepository;
import com.app.Repository.OrderDetailRepository;
import com.app.Repository.OrderRepository;
import com.app.Repository.ProductRepository;
import com.app.Repository.UserRepository;


@Service
@Transactional
public class OrderserviceImpl implements OrderService {
	
	@Autowired
	 private  UserRepository userRepository;
	
	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
	private OrderDetailRepository  orderDetailRepository;
	
	@Autowired
	private OrderRepository orderRepository;
	
	@Autowired
	private CartRepository cartRepository;


	public OrderDTO createOrder(CreateOrderRequest request) {
		
		System.out.println("In Create Order service : "+ request.getId());
	    // Fetch the User entity using the userId
		User user = userRepository.findById(request.getId())
		        .orElseThrow(() -> new RuntimeException("User not found with id: " + request.getId()));
	    // Create a new Order entity
	    Order order = new Order();
	    order.setUser(user); // Set the user for the order
	    order.setOrderDate(LocalDate.now());
	    order.setComment(request.getComment());
        order.setOrderStatus(request.getOrderStatus());
        order.setTableNumber(request.getTableNumber());
	    order = orderRepository.save(order); 
	  
	    
	    
//	    // Process the items from the request and map them to OrderProducts entities
	    List<OrderItemDTO> itemDTOs = request.getItems();
	    for (OrderItemDTO itemDTO : itemDTOs) {
//	         Fetch the Product entity using productId from the request
	    	Product product = productRepository.findById(itemDTO.getProductId())
	    	        .orElseThrow(() -> new RuntimeException("Product not found with id: " + itemDTO.getProductId()));
	    	
	   

	       
	        // Create a new OrderProducts entity
	        OrderProducts orderItem = new OrderProducts();
	        orderItem.setProduct(product); // Set the product for the order item
	        orderItem.setQuantity(itemDTO.getQuantity()); // Set the quantity for the order item
	        orderItem.setOrder(order); // Link the order item to the order (this sets order_id in OrderProducts)
	        
	        // Add the OrderProducts to the Order's list of items
	        order.getOrderDetails().add(orderItem); // Add to the order's items list
	    }

	    // Save the Order entity to the database
	    orderRepository.save(order); // After saving, orderId will be populated in the Order entity

//	     Now, the orderId is set in each OrderProducts (due to the @ManyToOne relationship)

//	     Save the OrderProducts entities (if necessary)
	    orderDetailRepository.saveAll(order.getOrderDetails()); // Save all order items in batch

//	     Convert the saved Order entity to OrderDTO and return it

	    cartRepository.deleteByUserId(request.getId());

	    return new OrderDTO(order);
	}
	
	public List<OrderDtoResponse> getOrdersByUserId(Long userId) {
	    // Fetch all orders for the user
	    List<Order> orders = orderRepository.findByUserId(userId);

	    // Map each order to an OrderDTO
	    return orders.stream()
	                 .map(OrderDtoResponse::new)
	                 .collect(Collectors.toList());
	}
	

	

	   

	    public List<AdminOrderDto> getAllOrders() {
	        List<OrderProducts> orderProducts = orderDetailRepository.findAllOrderProducts();
	        return orderProducts.stream()
	                            .map(AdminOrderDto::new)  // Map each OrderProduct to DTO
	                            .collect(Collectors.toList());
	    }
	

	    @Override
	    public void updateOrderStatus(Long orderId, String status) {

	        Order order = orderRepository.findById(orderId)
	                .orElseThrow(() -> new RuntimeException("Order not found with id: " + orderId));

	        order.setOrderStatus(status);
	        orderRepository.save(order);
	    }


}
