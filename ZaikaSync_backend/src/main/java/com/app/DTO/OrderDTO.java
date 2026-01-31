package com.app.DTO;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import com.app.Entity.Order;

public class OrderDTO {
    private Long orderId;
    private Long userId;
    private LocalDate orderDate;
    private List<OrderItemDTO> items;

    // Constructor
    public OrderDTO(Order order) {
        this.orderId = order.getOrderId();
        this.userId = order.getUser().getId();
        this.orderDate = order.getOrderDate();
        this.items = order.getOrderDetails().stream()  // Now works with the getter method
                          .map(item -> new OrderItemDTO(item.getProduct().getProductId(), item.getQuantity()))
                          .collect(Collectors.toList());
    }

    // Getters and setters
    public Long getOrderId() {
        return orderId;
    }

    public void setOrderId(Long orderId) {
        this.orderId = orderId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public LocalDate getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(LocalDate orderDate) {
        this.orderDate = orderDate;
    }

    public List<OrderItemDTO> getItems() {
        return items;
    }

    public void setItems(List<OrderItemDTO> items) {
        this.items = items;
    }
}