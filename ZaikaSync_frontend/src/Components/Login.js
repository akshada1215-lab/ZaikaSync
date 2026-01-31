import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { loginUser } from "../api/authApi";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().required("Password is required"),
    }),

    onSubmit: async (values) => {
      try {
        const response = await loginUser(values);
        const user = response.data;

        sessionStorage.setItem(
          "userName",
          user.authenticatedDetails.principal.name,
        );
        sessionStorage.setItem(
          "userId",
          user.authenticatedDetails.principal.id,
        );
        sessionStorage.setItem(
          "userRole",
          user.authenticatedDetails.principal.role,
        );
        sessionStorage.setItem("jwtToken", user.jwt);

        toast.success("Login successful!", { autoClose: 1000 });

        if (user.authenticatedDetails.principal.role === "ROLE_ADMIN") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } catch {
        toast.error("Invalid email or password", { autoClose: 1000 });
      }
    },
  });

  return (
    <div className="auth-page">
      <ToastContainer />

      <div className="auth-card shadow-lg">
        <h2 className="text-center mb-4">Login to ZaikaSync</h2>

        <form onSubmit={formik.handleSubmit}>
          {/* Email */}
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              {...formik.getFieldProps("email")}
              className="form-control"
            />
            {formik.touched.email && formik.errors.email && (
              <small className="text-danger">{formik.errors.email}</small>
            )}
          </div>

          {/* Password */}
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              {...formik.getFieldProps("password")}
              className="form-control"
            />
            {formik.touched.password && formik.errors.password && (
              <small className="text-danger">{formik.errors.password}</small>
            )}
          </div>

          <button type="submit" className="btn auth-btn w-100 mt-3">
            Login
          </button>
        </form>

        <div className="text-center mt-3">
          <p className="mb-1">Don’t have an account?</p>
          <Link to="/register" className="auth-link">
            Register here
          </Link>
        </div>
        <div className="text-center mt-3">
          <p>
            Forgot password?
            <Link
              to="/forgotpassword"
              style={{ textDecoration: "none", color: "blue" }}
            >
              <strong> Click here</strong>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
