
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCartByUserId, removeFromCart } from "../api/cartApi";
import { getDiscountSlabs } from "../api/discountApi";
import "./Cart.css";

function Cart({ setCartCount }) {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [comment, setComment] = useState("");
  const [tableNumber, setTableNumber] = useState("");

  const userId = sessionStorage.getItem("userId");
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  useEffect(() => {
    calculateTotal();
  }, [cartItems]);

  const loadCart = async () => {
    const res = await getCartByUserId(userId);
    setCartItems(res.data || []);
    setCartCount(res.data?.length || 0);
  };

  const calculateTotal = async () => {
    const total = cartItems.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    setTotalPrice(total);

    // Fetch discount slabs
    const discountRes = await getDiscountSlabs();
    const slabs = discountRes.data || [];

    // Find highest applicable discount
    let bestDiscount = 0;
    slabs.forEach((slab) => {
      if (total >= slab.startPrice && total <= slab.endPrice) {
        bestDiscount = Math.max(bestDiscount, slab.discountPercentage);
      }
    });

    setDiscountPercent(bestDiscount);
    const discountedAmount = total - (total * bestDiscount) / 100;
    setFinalPrice(discountedAmount);
  };

  const handleRemove = async (productId) => {
    await removeFromCart(userId, productId);
    const updated = cartItems.filter(
      (item) => item.product.productId !== productId
    );
    setCartItems(updated);
    setCartCount(updated.length);
  };

  const proceedToPayment = () => {
    navigate("/payment", {
      state: {
        cartItems,
        totalPrice,
        discountPercent,
        finalPrice,
        comment,
        tableNumber,
      },
    });
  };

  return (
    <div className="cart-container">
      {cartItems.length ? (
        <>
          {cartItems.map((item) => (
            <div className="cart-item" key={item.product.productId}>
              <img
                src={`data:image/png;base64,${item.product.productImage}`}
                alt={item.product.productName}
              />
              <div className="cart-details">
                <h4>{item.product.productName}</h4>
                <p>₹ {item.product.price}</p>
                <p>Qty: {item.quantity}</p>
                <button onClick={() => handleRemove(item.product.productId)}>
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Extra Inputs */}
          <div className="extra-inputs">
            <input
              type="text"
              placeholder="Table Number"
              value={tableNumber}
              onChange={(e) => setTableNumber(e.target.value)}
            />
            <textarea
              placeholder="Cooking instructions (less spicy, no onion...)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>

          {/* Pricing Summary */}
          <div className="cart-summary">
            <p>Total Price: ₹ {totalPrice}</p>
            <p>Discount: {discountPercent}%</p>
            <p className="final">
              Final Payable: ₹ {finalPrice.toFixed(2)}
            </p>

            <button onClick={proceedToPayment}>
              Proceed to Payment
            </button>
          </div>
        </>
      ) : (
        <p className="empty-cart-message">Your cart is empty</p>
      )}
    </div>
  );
}

export default Cart;

