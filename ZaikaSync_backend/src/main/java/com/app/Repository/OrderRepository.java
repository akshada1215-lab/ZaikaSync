package com.app.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.Entity.Order;
import com.app.Entity.OrderProducts;
import com.app.Entity.User;

public interface OrderRepository extends JpaRepository<Order, Long> {

	List<Order> findByUser(User user);

	List<Order> findByUserId(Long userId);

//	List<Order> findAll(); // This will fetch all orders
	 @Query("SELECT op FROM OrderProducts op JOIN FETCH op.order o JOIN FETCH o.user JOIN FETCH op.product")
     List<OrderProducts> findAllOrderProducts();

	
}
