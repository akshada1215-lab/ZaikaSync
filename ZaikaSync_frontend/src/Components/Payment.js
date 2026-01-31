import React, { useState } from "react";
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
} from "mdb-react-ui-kit";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { createOrder } from "../api/orderApi";
import { processPayment } from "../api/paymentApi";
import "react-toastify/dist/ReactToastify.css";
import { useCart } from "../context/CartContext";
import gatewayImg from "../images/paymentGateway.jpeg";
import paymentOptionsImg from "../images/payment1.png";

export default function PaymentForm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { fetchCartCount } = useCart();

  const {
    cartItems = [],
    totalPrice = 0,
    discountPercent = 0,
    finalPrice = totalPrice,
    comment = "",
    tableNumber = "",
  } = location.state || {};

  const [cardNumber, setCardNumber] = useState("");
  const [cardHolderName, setCardHolderName] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!cartItems.length) {
    navigate("/");
    return null;
  }

  const validateCard = () => {
    // Card number: 16 digits
    if (!/^\d{16}$/.test(cardNumber)) return "Card number must be 16 digits";

    // Card holder name
    if (!cardHolderName.trim()) return "Card holder name required";

    // Expiry format MM/YYYY
    if (!/^(0[1-9]|1[0-2])\/\d{4}$/.test(expiration))
      return "Invalid expiry format (MM/YYYY)";

    // CVV
    if (!/^\d{3}$/.test(cvv)) return "Invalid CVV";

    // Future date validation
    const [expMonth, expYear] = expiration.split("/").map(Number);
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    if (
      expYear < currentYear ||
      (expYear === currentYear && expMonth <= currentMonth)
    ) {
      return "Card expiry date must be in the future";
    }

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateCard();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const userId = sessionStorage.getItem("userId");

      const orderPayload = {
        id: userId,
        tableNumber,
        comment,
        items: cartItems.map((item) => ({
          productId: item.product.productId,
          quantity: item.quantity,
        })),
      };

      const orderRes = await createOrder(orderPayload);
      const orderId = orderRes.data.orderId;

      await processPayment({
        orderId,
        amount: finalPrice,
      });

      toast.success("Payment successful!", { autoClose: 1200 });
      await fetchCartCount();
      setTimeout(() => navigate("/"), 1500);
    } catch {
      toast.error("Payment failed. Try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <MDBContainer fluid className="py-5" style={{ background: "#f5f7fa" }}>
      <MDBRow className="justify-content-center">
        <MDBCol md="6" lg="5">
          <MDBCard className="shadow" style={{ borderRadius: "20px" }}>
            <MDBCardBody className="p-4">
              <div className="text-center mb-4">
                <img src={gatewayImg} alt="Payment" style={{ width: "35%" }} />
              </div>

              <form onSubmit={handleSubmit}>
                <MDBInput
                  label="Card Number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="mb-3"
                />

                <MDBInput
                  label="Cardholder Name"
                  value={cardHolderName}
                  onChange={(e) => setCardHolderName(e.target.value)}
                  className="mb-3"
                />

                <MDBRow>
                  <MDBCol size="6">
                    <MDBInput
                      label="MM/YYYY"
                      value={expiration}
                      onChange={(e) => setExpiration(e.target.value)}
                    />
                  </MDBCol>
                  <MDBCol size="6">
                    <MDBInput
                      label="CVV"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                    />
                  </MDBCol>
                </MDBRow>

                {error && (
                  <p className="text-danger text-center mt-2">{error}</p>
                )}

                <div className="text-center mt-3">
                  <p>Total: ₹{totalPrice}</p>
                  <p>Discount: {discountPercent}%</p>
                  <h5>Payable: ₹{finalPrice.toFixed(2)}</h5>
                </div>

                <div className="text-center mt-4">
                  <MDBBtn
                    color="info"
                    size="lg"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      "Processing..."
                    ) : (
                      <>
                        Pay Now <MDBIcon fas icon="arrow-right" />
                      </>
                    )}
                  </MDBBtn>
                </div>
              </form>

              <div className="text-center mt-4">
                <img
                  src={paymentOptionsImg}
                  alt="Payments"
                  style={{ width: "55%" }}
                />
              </div>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>

      <ToastContainer />
    </MDBContainer>
  );
}
