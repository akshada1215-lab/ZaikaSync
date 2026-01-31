import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddProduct.css";
import Admin from "./Admin";
import { toast, ToastContainer } from "react-toastify";

function AddProduct() {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [foodType, setFoodType] = useState("veg");
  const [description, setDescription] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/admin/getAllCategories`,
          {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
            },
          },
        );
        setCategories(res.data || []);
      } catch {
        toast.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !productName ||
      !productPrice ||
      !categoryId ||
      !productImage ||
      !description
    ) {
      setError("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("price", productPrice);
    formData.append("categoryId", categoryId);
    formData.append("productImage", productImage);
    formData.append("foodType", foodType); // "veg" | "non-veg"
    formData.append("description", description);
   

    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/admin/addProduct`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );

      toast.success("Product added successfully!");
      setProductName("");
      setProductPrice("");
      setCategoryId("");
      setProductImage(null);
      setFoodType("veg");
      setDescription("");
      setError("");
    } catch {
      toast.error("Failed to add product");
    }
  };

  return (
    <Admin>
      <ToastContainer />
      <div className="add-product-container">
        <h3 className="title">Add New Food Item</h3>

        <form onSubmit={handleSubmit} className="product-form">
          <label>Food Item Name</label>
          <input
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />

          <label>Price</label>
          <input
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
          />

          <label>Category</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c.categoryId} value={c.categoryId}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Veg / Non-Veg */}
          <label>Food Type</label>
          <div className="radio-group">
            <div className="radio-option">
              <input
                type="radio"
                name="foodType"
                checked={foodType === "veg"}
                onChange={() => setFoodType("veg")}
              />
              <span>Veg</span>
            </div>

            <div className="radio-option">
              <input
                type="radio"
                name="foodType"
                checked={foodType === "non-veg"}
                onChange={() => setFoodType("non-veg")}
              />
              <span>Non-Veg</span>
            </div>
          </div>

          <label>Description</label>
          <textarea
            rows="3"
            placeholder="Describe the food item"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <label>Food Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProductImage(e.target.files[0])}
          />

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="submit-btn">
            Add Food Item
          </button>
        </form>
      </div>
    </Admin>
  );
}

export default AddProduct;
