package com.app.Controller;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.app.DTO.AdminOrderDto;
import com.app.DTO.AdminPaymentDYTO;
import com.app.DTO.CategoryDTO;
import com.app.DTO.ProductDTO;
import com.app.DTO.ProductUpdateDTO;
import com.app.Entity.Product;
import com.app.Exception.ResourceNotFoundException;
import com.app.Service.CategoryService;
import com.app.Service.OrderService;
import com.app.Service.PaymentService;
import com.app.Service.ProductService;

@RestController
@RequestMapping("/admin")
public class AdminController {

	@Autowired
	private CategoryService CategoryService;
	
	@Autowired
	private ProductService productService;
	
	@Autowired
	private OrderService orderService;
	
	@Autowired
	private PaymentService paymentService;

	// Endpoint to add a new category
	@PostMapping("/addCategory")
	public ResponseEntity<CategoryDTO> addCategory(
	        @RequestParam("name") String name,
	        @RequestParam("image") MultipartFile image) throws IOException {

	    // Call service method
	    CategoryDTO categoryDTO = CategoryService.addCategory(name, image);

	    // Return response with 201 Created status
	    return ResponseEntity.status(HttpStatus.CREATED).body(categoryDTO);
	}
	
	
	  @GetMapping("/getAllCategories")
	    public ResponseEntity<?> getAllCategories() {
	        try {
	            List<CategoryDTO> categories = CategoryService.getAllCategories();
	            return ResponseEntity.ok(categories);
	        } catch (Exception e) {
	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                    .body("An error occurred while fetching categories: " + e.getMessage());
	        }
	    }
	  
	  @PostMapping("/addProduct")
	    public ResponseEntity<?> addProduct(
	            @RequestParam("productName") String productName,
	            @RequestParam("price") double price,
//	            @RequestParam("quantity") double quantity,
	            @RequestParam("productImage") MultipartFile productImage,
	            @RequestParam("description") String description,
	            @RequestParam("foodType") String foodType,
	            @RequestParam("categoryId") Long categoryId) throws IOException {
	        Product savedProduct = productService.addProduct(productName, price, productImage,description, foodType,categoryId);
			return ResponseEntity.ok(savedProduct);
	    }

	  
	  @GetMapping("/getProductsByCategory/{id}")
	    public ResponseEntity<List<Product>> getProductsByCategory(@PathVariable Long id) {
	        List<Product> products = productService.getProductsByCategory(id);
	        return ResponseEntity.ok(products);
	    }
	  
	  @GetMapping("/getAllProducts")
	  public ResponseEntity<List<ProductDTO>> getAllProducts() {
	      try {
	          List<ProductDTO> products = productService.getAllProducts();
	          return new ResponseEntity<>(products, HttpStatus.OK);
	      } catch (Exception e) {
	          return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	      }
	  }
	  
	  @GetMapping("/getAllOrders")
	  public ResponseEntity<List<AdminOrderDto>> getAllOrders() {
	      try {
	          List<AdminOrderDto> orders = orderService.getAllOrders();
	          return new ResponseEntity<>(orders, HttpStatus.OK);
	      } catch (Exception e) {
	          return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	      }
	  }
	  
	  @GetMapping("/getAllPayments")
	  public ResponseEntity<List<AdminPaymentDYTO>> getAllPayments() {
	      try {
	          List<AdminPaymentDYTO> payments = paymentService.getAllPayments();
	          return new ResponseEntity<>(payments, HttpStatus.OK);
	      } catch (Exception e) {
	          return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
	      }
	  }
	  
	  @PutMapping("/updateProduct/{id}")
	  public ResponseEntity<?> updateProduct(@PathVariable Long id, @RequestBody ProductUpdateDTO productUpdateDTO) {
	      try {
	          Product updatedProduct = productService.updateProduct(id, productUpdateDTO);
	          return new ResponseEntity<>(updatedProduct, HttpStatus.OK);
	      } catch (ResourceNotFoundException e) {
	          return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
	      } catch (Exception e) {
	          return new ResponseEntity<>("An unexpected error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
	      }
	  }
	  
	  @GetMapping("/product/{id}")
	  public ResponseEntity<?> getProductById(@PathVariable Long id) {
	      try {
	          Product product = productService.getProductById(id);
	          return new ResponseEntity<>(product, HttpStatus.OK);
	      } catch (ResourceNotFoundException e) {
	          return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
	      } catch (Exception e) {
	          return new ResponseEntity<>("An unexpected error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
	      }
	  }
	  @PutMapping("/{orderId}/status")
	    public ResponseEntity<String> updateOrderStatus(
	            @PathVariable Long orderId,
	            @RequestParam String status
	    ) {
	        orderService.updateOrderStatus(orderId, status);
	        return ResponseEntity.ok("Order status updated successfully");
	    }
}
