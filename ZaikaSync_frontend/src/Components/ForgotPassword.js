import React, { useState } from "react";
import { forgotPassword } from "../api/authApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.warning("Please enter your email");
      return;
    }

    try {
      setLoading(true);
      await forgotPassword(email);

      toast.success("Password reset link sent to your email!", {
        autoClose: 3000,
      });

      setEmail("");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Invalid email address",
        { autoClose: 3000 }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <ToastContainer position="top-right" />

      <div className="forgot-wrapper">
        <div className="forgot-card">
          <h2 className="forgot-title">Forgot Password</h2>
          <p className="forgot-subtitle">
            Enter your registered email to receive a reset link
          </p>

          <form onSubmit={handleSubmit} className="forgot-form">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="example@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default ForgotPassword;
