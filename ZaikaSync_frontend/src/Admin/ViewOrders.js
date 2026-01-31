import React, { useEffect, useState } from "react";
import Admin from "./Admin";
import { getAllOrders, updateOrderStatus } from "../api/orderApi";
import "./ViewOrders.css";

const STATUS_OPTIONS = [
  "PLACED",
  "COOKING",
  "READY",
  "SERVED",
  "COMPLETED",
  "CANCELLED",
];

function ViewOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await getAllOrders();
      setOrders(response.data || []);
    } catch (error) {
      console.error("Error fetching orders", error);
    }
  };

  const handleStatusChange = async (orderId, status) => {
    try {
      await updateOrderStatus(orderId, status);
      fetchOrders(); // refresh
    } catch (error) {
      console.error("Failed to update order status");
    }
  };

  // Group orders by orderId
  const groupedOrders = orders.reduce((acc, order) => {
    if (!acc[order.orderId]) {
      acc[order.orderId] = {
        orderId: order.orderId,
        orderDate: order.orderDate,
        userName: order.userName,
        tableNumber: order.tableNumber,
        orderStatus: order.orderStatus,
        products: [],
      };
    }

    acc[order.orderId].products.push({
      productName: order.productName,
      quantity: order.quantity,
    });

    return acc;
  }, {});

  return (
    <Admin>
      <div className="view-orders-container">
        <h2>Restaurant Orders</h2>

        <div className="table-responsive-wrapper">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>User</th>
               
                <th>Items</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {Object.values(groupedOrders).length > 0 ? (
                Object.values(groupedOrders).map((order) => (
                  <tr key={order.orderId}>
                    <td>{order.orderId}</td>
                    <td>{order.orderDate}</td>
                    <td>{order.userName}</td>
                   

                    <td>
                      {order.products.map((p, idx) => (
                        <div key={idx} className="product-line">
                          {p.productName} × {p.quantity}
                        </div>
                      ))}
                    </td>

                    <td>
                      <select
                        className={`status-dropdown status-${order.orderStatus}`}
                        value={order.orderStatus}
                        onChange={(e) =>
                          handleStatusChange(order.orderId, e.target.value)
                        }
                      >
                        {STATUS_OPTIONS.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">No orders available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </Admin>
  );
}

export default ViewOrders;
