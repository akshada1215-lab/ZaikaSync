import React, { useEffect, useState } from "react";
import Admin from "./Admin";
import { getAllPayments } from "../api/paymentApi";
import "./ViewPayments.css";

function ViewPayments() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await getAllPayments();
      setPayments(response.data || []);
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  return (
    <Admin>
      <div className="view-payments-container">
        <h2 className="page-title">Payments</h2>

        <div className="table-responsive-wrapper">
          <table className="payments-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Order Date</th>
                <th>User</th>
                <th>Status</th>
                <th>Amount (₹)</th>
              </tr>
            </thead>

            <tbody>
              {payments.length > 0 ? (
                payments.map((payment) => (
                  <tr key={payment.paymentId}>
                    <td>{payment.orderId}</td>
                    <td>{payment.orderDate}</td>
                    <td>{payment.userName || "N/A"}</td>
                    <td>
                      <span
                        className={`status-badge ${payment.paymentStatus?.toLowerCase()}`}
                      >
                        {payment.paymentStatus}
                      </span>
                    </td>
                    <td className="amount">₹{payment.amount}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-data">
                    No payments available
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

export default ViewPayments;
