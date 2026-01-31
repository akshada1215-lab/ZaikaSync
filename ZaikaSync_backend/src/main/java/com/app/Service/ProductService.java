package com.app.Service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.app.DTO.ProductDTO;
import com.app.DTO.ProductUpdateDTO;
import com.app.Entity.Product;

public interface ProductService {

	//Product addProduct(String productName, double price, double quantity, MultipartFile productImage, String Long categoryId);

	List<Product> getProductsByCategory(Long id);

	List<ProductDTO> getAllProducts();

	Product updateProduct(Long id, ProductUpdateDTO productUpdateDTO);

	Product getProductById(Long productId);

	Product addProduct(String productName, double price, MultipartFile productImage, String description,
			String foodType, Long categoryId);

}
