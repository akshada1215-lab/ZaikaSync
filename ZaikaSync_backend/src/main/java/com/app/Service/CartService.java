package com.app.Service;

import java.util.List;

import com.app.DTO.CartDTO;
import com.app.Entity.Cart;

public interface CartService {

	Cart addToCart(CartDTO cartDTO);

	List<Cart> getCartByUserId(Long userId);

	void removeProductFromCart(Long userId, Long productId);

}
