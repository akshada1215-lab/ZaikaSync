import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Admin from "./Admin";
import {
  getAllProducts,
  updateProductAvailability,
} from "../api/productApi";
import "./ViewProducts.css";

function ViewProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const res = await getAllProducts();
      setProducts(res.data || []);
    } catch {
      toast.error("Failed to load products");
    }
  };

  const handleAvailabilityToggle = async (productId, currentStatus) => {
    try {
      await updateProductAvailability(productId, !currentStatus);
      toast.success("Product availability updated");
      loadProducts();
    } catch {
      toast.error("Failed to update availability");
    }
  };

  return (
    <Admin>
      <ToastContainer />
      <div className="view-products-container">
        <h3 className="title">View Products</h3>

        <div className="table-wrapper">
          <table className="product-table">
            <thead>
              <tr>
                <th>Food Name</th>
                <th>Price (₹)</th>
                <th>Type</th>
                <th>Category</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {products.length > 0 ? (
                products.map((p) => (
                  <tr key={p.id}>
                    <td>{p.productName}</td>
                    <td>₹ {p.price}</td>

                    <td>
                      <span
                        className={`food-badge ${
                          p.foodType === "veg" ? "veg" : "nonveg"
                        }`}
                      >
                        {p.foodType}
                      </span>
                    </td>

                    <td>{p.categoryName}</td>

                    <td>
                      <span
                        className={`status-badge ${
                          p.isAvailable ? "available" : "unavailable"
                        }`}
                      >
                        {p.isAvailable ? "Available" : "Not Available"}
                      </span>
                    </td>

                    <td className="action-col">
                      <button
                        className="edit-btn"
                        onClick={() =>
                          navigate(`/admin/editproduct/${p.id}`)
                        }
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-data">
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Admin>
  );
}

export default ViewProducts;
