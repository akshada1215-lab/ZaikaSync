package com.app.Service;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.app.DTO.CategoryDTO;
import com.app.Entity.Category;
import com.app.Repository.CategoryRepository;

@Service
public class CategoryServiceImple implements CategoryService {
	
	@Autowired
	private CategoryRepository categoryRepository;

	@Override
	public CategoryDTO addCategory(String name, MultipartFile image) {
	    try {
	        // Convert image to byte array
	        byte[] imageBytes = image.getBytes();

	        // Create Category entity
	        Category category = new Category();
	        category.setName(name);
	        category.setImage(imageBytes);

	        // Save category in DB
	        Category savedCategory = categoryRepository.save(category);

	        // Return DTO with saved data
	        return new CategoryDTO(savedCategory.getCategoryId(), savedCategory.getName(), savedCategory.getImage());

	    } catch (IOException e) {
	        throw new RuntimeException("Error processing image file", e);
	    }
	}

	@Override
	public List<CategoryDTO> getAllCategories() {
		List<Category> categories = categoryRepository.findAll();
		
		return categories.stream()
				.map(c-> new CategoryDTO(c.getCategoryId(),
						c.getName(), 
						c.getImage()
						))
				.collect(Collectors.toList());
						
	}

}
