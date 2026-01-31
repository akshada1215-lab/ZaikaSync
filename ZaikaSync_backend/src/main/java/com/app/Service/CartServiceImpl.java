package com.app.Service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.DTO.CartDTO;
import com.app.Entity.Cart;
import com.app.Entity.Product;
import com.app.Entity.User;
import com.app.Exception.ResourceNotFoundException;
import com.app.Repository.CartRepository;
import com.app.Repository.ProductRepository;
import com.app.Repository.UserRepository;
@Service
public class CartServiceImpl implements CartService {

	@Autowired
    private CartRepository cartRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

 public Cart addToCart(CartDTO cartDTO) {
        // Fetch User and Product using their IDs
        User user = userRepository.findById(cartDTO.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + cartDTO.getUserId()));
        
        Product product = productRepository.findById(cartDTO.getProductId())
                .orElseThrow(() -> new ResourceNotFoundException("Product not found with id: " + cartDTO.getProductId()));
        			


      
        // Create and set the Cart entity
        Cart cart = new Cart();
        cart.setQuantity(cartDTO.getQuantity());
        cart.setUser(user);
        cart.setProduct(product);

        // Save the cart item
        return cartRepository.save(cart);
    }

 public List<Cart> getCartByUserId(Long userId) {
	    // Check if the user exists
	    User user = userRepository.findById(userId)
	            .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

	    // Fetch the cart items associated with the user
	    List<Cart> cartItems = cartRepository.findByUserId(userId);

	    // Merge duplicate products by increasing quantity
	    List<Cart> mergedCart = cartItems.stream()
	            .collect(Collectors.toMap(
	                    cart -> cart.getProduct().getProductId(), // Use productId as key
	                    cart -> cart, // Keep cart as value
	                    (existingCart, duplicateCart) -> { 
	                        existingCart.setQuantity(existingCart.getQuantity() + duplicateCart.getQuantity()); 
	                        return existingCart; 
	                    }
	            ))
	            .values()
	            .stream()
	            .collect(Collectors.toList());

	    return mergedCart;
	}
 

     @Override
     public void removeProductFromCart(Long userId, Long productId) {
         // Ensure the user exists
         userRepository.findById(userId)
                 .orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));

         // Call the custom query to delete the cart item
         cartRepository.deleteByUserIdAndProductId(userId, productId);
     }
 
}
