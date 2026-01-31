package com.app.Repository;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.app.Entity.Cart;

public interface CartRepository extends JpaRepository<Cart, Long> {

	List<Cart> findByUserId(Long userId);

	
	    
	    // Custom Query to delete a cart item based on userId and productId
	    @Modifying
	    @Transactional
	    @Query("DELETE FROM Cart c WHERE c.user.id = :userId AND c.product.id = :productId")
	    void deleteByUserIdAndProductId(@Param("userId") Long userId, @Param("productId") Long productId);
	
	    
	   
	        
	        @Transactional
	        @Modifying
	        @Query("DELETE FROM Cart c WHERE c.user.id = :userId")
	        void deleteByUserId(@Param("userId") Long userId);
	    
}
