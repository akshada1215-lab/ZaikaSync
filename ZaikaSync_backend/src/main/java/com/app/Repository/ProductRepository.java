package com.app.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.Entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

	List<Product> findByCategory_Id(Long categoryId);

	List<Product> findAll();

}
