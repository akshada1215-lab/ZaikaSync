import React, { useEffect, useState } from "react";
import { getOrdersByUserId } from "../api/orderApi";
import "./Orders.css";

function Orders() {
  const [orders, setOrders] = useState([]);
  const userId = sessionStorage.getItem("userId");


  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await getOrdersByUserId(userId);
      setOrders(response.data || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <div className="orders-page">
      <h2 className="orders-heading">My Orders</h2>

      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order.orderId} className="order-card">
            {/* Order Header */}
            <div className="order-header">
              <div>
                <h4>Order #{order.orderId}</h4>
                <span className="order-date">
                  {order.orderDate
                    ? new Date(order.orderDate).toLocaleDateString()
                    : "N/A"}
                </span>
              </div>
              <span
                className={`order-status ${order.orderStatus?.toLowerCase()}`}
              >
                {order.orderStatus || "PLACED"}
              </span>
            </div>

            {/* Products */}
            <div className="order-products">
              {order.orderItems && order.orderItems.length > 0 ? (
                order.orderItems.map((item) => (
                  <div key={item.productId} className="order-product">
                    <img
                      src={
                        item.productImage
                          ? `data:image/png;base64,${item.productImage}`
                          : process.env.PUBLIC_URL + "/images/product.png"
                      }
                      alt={item.productName}
                    />

                    <div className="order-product-details">
                      <h5>{item.productName}</h5>
                      <p>Qty: {item.quantity}</p>
                      <p className="price">₹{item.productPrice?.toFixed(2)}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="empty-products">No products in this order.</p>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="empty-orders">
          <h4>No orders yet</h4>
          <p>Your order history will appear here.</p>
        </div>
      )}
    </div>
  );
}

export default Orders;
