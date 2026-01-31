package com.app.DTO;

import java.util.Base64;

import com.app.Entity.Product;

public class ProductDTO {

    private Long id;
    private String productName;
    private double price;
    private String description;
    private String foodType;
    private String categoryName;

	private Boolean isAvailable = true;

    // Image will be sent as Base64 string
    private String productImage;

    public ProductDTO() {
        // default constructor
    }

    public ProductDTO(Product product) {
        this.id = product.getProductId();
        this.productName = product.getProductName();
        this.price = product.getPrice();
        this.description = product.getDescription();
        this.foodType = product.getFoodType();
        this.isAvailable=product.getIsAvailable();

        this.categoryName = product.getCategory() != null
                ? product.getCategory().getName()
                : null;

        // Convert byte[] → Base64 string for frontend
        if (product.getProductImage() != null) {
            this.productImage = Base64.getEncoder()
                    .encodeToString(product.getProductImage());
        }
    }

    // Getters & Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getFoodType() {
        return foodType;
    }

    public void setFoodType(String foodType) {
        this.foodType = foodType;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public String getProductImage() {
        return productImage;
    }

    public void setProductImage(String productImage) {
        this.productImage = productImage;
    }

	public Boolean getIsAvailable() {
		return isAvailable;
	}

	public void setIsAvailable(Boolean isAvailable) {
		this.isAvailable = isAvailable;
	}
}
