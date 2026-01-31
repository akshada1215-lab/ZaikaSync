package com.app.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.app.Entity.OrderProducts;

public interface OrderDetailRepository extends JpaRepository<OrderProducts, Long> {

	@Query("SELECT op FROM OrderProducts op JOIN FETCH op.order o JOIN FETCH o.user JOIN FETCH op.product")
    List<OrderProducts> findAllOrderProducts();

}
