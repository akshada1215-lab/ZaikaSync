package com.app.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.app.DTO.CreateOrderRequest;
import com.app.DTO.OrderDTO;
import com.app.DTO.OrderDtoResponse;
import com.app.Exception.ResourceNotFoundException;
import com.app.Service.OrderService;

@RestController
@RequestMapping("/customer")
public class OrderController {

	@Autowired
    private OrderService orderService;

    
    @PostMapping("/createOrder")
    public ResponseEntity<OrderDTO> createOrder(@RequestBody CreateOrderRequest request) {
        try {
        	System.out.println("In Create Order: "+ request.getId());
            // Call the service layer to create an order
            OrderDTO orderdto = orderService.createOrder(request);
            System.out.println(" calling service ");
            return new ResponseEntity<>(orderdto, HttpStatus.CREATED); // Return 201 with the order details
        } catch (Exception e) {
            // In case of an error, return an internal server error
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping("/getOrdersByUserId/{id}")
    public ResponseEntity<List<OrderDtoResponse>> getOrdersByUser(@PathVariable Long id) {
        try {
            List<OrderDtoResponse> orders = orderService.getOrdersByUserId(id);
            return new ResponseEntity<>(orders, HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }
}
