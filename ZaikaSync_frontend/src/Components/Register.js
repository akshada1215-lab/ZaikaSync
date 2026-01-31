import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../api/authApi";
import "react-toastify/dist/ReactToastify.css";
import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      contact: "",
      email: "",
      password: "",
      pincode: "",
      address: "",
    },

validationSchema: Yup.object({
  name: Yup.string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must not exceed 50 characters")
    .matches(/^[A-Za-z\s]+$/, "Name can contain only letters and spaces")
    .required("Name is required"),

  contact: Yup.string()
    .matches(/^[6-9]\d{9}$/, "Enter a valid 10-digit mobile number")
    .required("Mobile number is required"),

  email: Yup.string()
    .trim()
    .email("Enter a valid email address")
    .required("Email is required"),

  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/\d/, "Password must contain at least one number")
    .matches(/[@$!%*?&]/, "Password must contain at least one special character")
    .required("Password is required"),

  pincode: Yup.string()
    .matches(/^[1-9][0-9]{5}$/, "Enter a valid 6-digit pincode")
    .required("Pincode is required"),

  address: Yup.string()
    .trim()
    .min(10, "Address must be at least 10 characters")
    .max(200, "Address must not exceed 200 characters")
    .required("Address is required"),
}),

    onSubmit: async (values) => {
      const userData = {
        userName: values.name,
        contact: values.contact,
        email: values.email,
        password: values.password,
        pincode: values.pincode,
        address: values.address,
      };

      try {
        await registerUser(userData);
        toast.success("Registration successful!");
        navigate("/login");
      } catch {
        toast.error("Registration failed. Try again.");
      }
    },
  });

  return (
    <div className="auth-page">
      <ToastContainer />

      <div className="auth-card shadow-lg">
        <h2 className="text-center mb-3">Register</h2>

        <form onSubmit={formik.handleSubmit}>
          {[
            { name: "name", label: "Name", type: "text" },
            { name: "contact", label: "Mobile", type: "text" },
            { name: "email", label: "Email", type: "email" },
            { name: "pincode", label: "Pincode", type: "text" },
            { name: "password", label: "Password", type: "password" },
          ].map((field) => (
            <div className="mb-2" key={field.name}>
              <label>{field.label}</label>
              <input
                type={field.type}
                {...formik.getFieldProps(field.name)}
                className="form-control"
              />
              {formik.touched[field.name] && formik.errors[field.name] && (
                <small className="text-danger">{formik.errors[field.name]}</small>
              )}
            </div>
          ))}

          <div className="mb-2">
            <label>Address</label>
            <textarea
              {...formik.getFieldProps("address")}
              className="form-control"
              rows="2"
            />
            {formik.touched.address && formik.errors.address && (
              <small className="text-danger">{formik.errors.address}</small>
            )}
          </div>

          <button type="submit" className="btn auth-btn w-100 mt-3">
            Register
          </button>
        </form>

        <div className="text-center mt-3">
          <p className="mb-1">Already have an account?</p>
          <Link to="/login" className="auth-link">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
