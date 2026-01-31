import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Admin from "./Admin";
import { getAllDiscounts, updateDiscountStatus } from "../api/discountApi";
import "./ViewDiscount.css";

function ViewDiscount() {
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDiscounts();
  }, []);

  const fetchDiscounts = async () => {
    try {
      const response = await getAllDiscounts();
      setDiscounts(response.data || []);
    } catch (error) {
      toast.error("Failed to load discounts");
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (discountId, currentStatus) => {
    try {
      console.log(discountId);
      console.log(currentStatus);
      await updateDiscountStatus(discountId, !currentStatus);
      toast.success("Discount status updated");
      fetchDiscounts(); // refresh
    } catch (error) {
      toast.error("Failed to update discount");
    }
  };

  return (
    <Admin>
      <ToastContainer />
      <div className="view-discount-container">
        <h3 className="title">Discount Rules</h3>

        {loading ? (
          <p className="loading-text">Loading discounts...</p>
        ) : discounts.length === 0 ? (
          <p className="empty-text">No discount rules found</p>
        ) : (
          <div className="discount-table-wrapper">
            <table className="discount-table">
              <thead>
                <tr>
                  <th>Start Price (₹)</th>
                  <th>End Price (₹)</th>
                  <th>Discount (%)</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {discounts.map((discount) => (
                  <tr key={discount.discountId}>
                    <td>{discount.startPrice}</td>
                    <td>{discount.endPrice}</td>
                    <td>{discount.discountPercentage}%</td>
                    <td>
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={discount.isActive}
                          onChange={() =>
                            handleToggle(discount.discountId, discount.isActive)
                          }
                        />
                        <span className="slider"></span>
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Admin>
  );
}

export default ViewDiscount;
