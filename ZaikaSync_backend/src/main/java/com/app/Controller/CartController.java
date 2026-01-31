package com.app.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.app.DTO.CartDTO;
import com.app.Entity.Cart;
import com.app.Exception.ResourceNotFoundException;
import com.app.Service.CartService;

@RestController
@RequestMapping("/customer")
public class CartController {

    @Autowired
    private CartService cartService;

    @PostMapping("/addToCart")
    public ResponseEntity<?> addToCart(@RequestBody CartDTO cartDTO) {
        try {
            // Try to save the cart item
            Cart savedCart = cartService.addToCart(cartDTO);
            return new ResponseEntity<>(savedCart, HttpStatus.CREATED);
        } catch (ResourceNotFoundException e) {
            // If user or product not found, return a 404 response
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            // Catch any other unexpected errors and return a 500 response
            return new ResponseEntity<>("An unexpected error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @GetMapping("/getCartByUserId/{id}")
    public ResponseEntity<?> getCartByUserId(@PathVariable Long id) {
        try {
            List<Cart> cartItems = cartService.getCartByUserId(id);
            
            // If no items in the cart, return a message
            if (cartItems.isEmpty()) {
                return new ResponseEntity<>("Cart is empty", HttpStatus.NO_CONTENT);
            }
            
            return new ResponseEntity<>(cartItems, HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            // If user not found, return 404 Not Found
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            // Catch any other exception
            return  ResponseEntity.status(HttpStatus.BAD_REQUEST)
            		.body("Insufficient Stock ");
        }
    }
    
    @DeleteMapping("/removeProductFromCart")
    public ResponseEntity<String> removeProductFromCart(
            @RequestParam Long userId,
            @RequestParam Long productId) {
        try {
            cartService.removeProductFromCart(userId, productId);
            return ResponseEntity.ok("Product removed from cart successfully.");
        } catch (ResourceNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }
}
