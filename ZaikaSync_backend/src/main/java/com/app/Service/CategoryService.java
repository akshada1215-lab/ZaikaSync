package com.app.Service;

import java.io.IOException;
import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.app.DTO.CategoryDTO;

public interface CategoryService {

	CategoryDTO addCategory(String name, MultipartFile image) throws IOException;

	List<CategoryDTO> getAllCategories();

}
