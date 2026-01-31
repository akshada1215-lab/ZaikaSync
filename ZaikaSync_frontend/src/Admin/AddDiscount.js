import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Admin from "./Admin";
import { addDiscount } from "../api/discountApi";
import "./AddDiscount.css";

function AddDiscount() {
  const [startPrice, setStartPrice] = useState("");
  const [endPrice, setEndPrice] = useState("");
  const [discountPercentage, setDiscountPercentage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!startPrice || !endPrice || !discountPercentage) {
      setError("All fields are required");
      return;
    }

    if (Number(startPrice) >= Number(endPrice)) {
      setError("End price must be greater than start price");
      return;
    }

    if (Number(discountPercentage) <= 0 || Number(discountPercentage) > 100) {
      setError("Discount must be between 1 and 100");
      return;
    }

    const payload = {
      startPrice: Number(startPrice),
      endPrice: Number(endPrice),
      discountPercentage: Number(discountPercentage),
    };

    try {
      await addDiscount(payload);
      toast.success("Discount added successfully!");

      setStartPrice("");
      setEndPrice("");
      setDiscountPercentage("");
      setError("");
    } catch (error) {
      toast.error("Failed to add discount");
    }
  };

  return (
    <Admin>
      <ToastContainer />
      <div className="add-discount-container">
        <h3 className="title">Add Discount Rule</h3>

        <form onSubmit={handleSubmit} className="discount-form">
          <label>Start Price (₹)</label>
          <input
            type="number"
            value={startPrice}
            onChange={(e) => setStartPrice(e.target.value)}
            placeholder="e.g. 2000"
            min="0"
          />

          <label>End Price (₹)</label>
          <input
            type="number"
            value={endPrice}
            onChange={(e) => setEndPrice(e.target.value)}
            placeholder="e.g. 4000"
            min="0"
          />

          <label>Discount Percentage (%)</label>
          <input
            type="number"
            value={discountPercentage}
            onChange={(e) => setDiscountPercentage(e.target.value)}
            placeholder="e.g. 6"
            min="1"
            max="100"
          />

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="submit-btn">
            Add Discount
          </button>
        </form>
      </div>
    </Admin>
  );
}

export default AddDiscount;
