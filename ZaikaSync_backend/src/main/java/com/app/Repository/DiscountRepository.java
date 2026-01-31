package com.app.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.Entity.Discount;


public interface DiscountRepository extends JpaRepository<Discount, Long> {

	
	List<Discount> findByIsActiveTrue();
}
