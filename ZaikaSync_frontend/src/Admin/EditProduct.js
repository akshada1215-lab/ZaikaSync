import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Admin from "./Admin";
import {
  getProductById,
  updateProduct,
} from "../api/productApi";
import "./EditProduct.css";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [price, setPrice] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);

  useEffect(() => {
    loadProduct();
  }, []);

  const loadProduct = async () => {
    try {
      const res = await getProductById(id);
      setProduct(res.data);
      setPrice(res.data.price);
      setIsAvailable(res.data.isAvailable);
    } catch {
      toast.error("Failed to load product details");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateProduct(id, {
        price,
        isAvailable,
      });

      toast.success("Product updated successfully");
      setTimeout(() => navigate("/admin/viewproducts"), 1500);
    } catch {
      toast.error("Failed to update product");
    }
  };

  if (!product) return null;

  return (
    <Admin>
      <ToastContainer />
      <div className="edit-product-container">
        <h3 className="title">Edit Food Item</h3>

        <form className="edit-product-form" onSubmit={handleSubmit}>
          {/* READ ONLY */}
          <label>Food Name</label>
          <input value={product.productName} readOnly />

          <label>Food Type</label>
          <input value={product.foodType} readOnly />

          <label>Description</label>
          <textarea value={product.description} readOnly />

          {/* EDITABLE */}
          <label>Price (₹)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <label>Availability</label>
          <select
            value={isAvailable}
            onChange={(e) => setIsAvailable(e.target.value === "true")}
          >
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </select>

          <button type="submit" className="submit-btn">
            Update Product
          </button>
        </form>
      </div>
    </Admin>
  );
}

export default EditProduct;
