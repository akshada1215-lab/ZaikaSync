import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaPlus,
  FaCreditCard,
  FaBars,
  FaPercentage,
  FaTags,
} from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { AiOutlineEye } from "react-icons/ai";
import { GrPlan } from "react-icons/gr";
import AdminNavbar from "./AdminNavbar";
import "./AdminLayout.css";

function Admin({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <AdminNavbar />

      <div className="admin-layout">
        {/* Sidebar */}
        <aside className={`admin-sidebar ${sidebarOpen ? "open" : ""}`}>
          <div className="sidebar-header">
            <h3>Admin Panel</h3>
          </div>

          <nav className="sidebar-nav">
            <NavLink to="/admin/addcategory" className="sidebar-link">
              <MdCategory /> Categories
            </NavLink>

            <NavLink to="/admin/addproducts" className="sidebar-link">
              <FaPlus /> Add Products
            </NavLink>

            <NavLink to="/admin/adddiscount" className="sidebar-link">
              <FaPercentage /> Add Discount
            </NavLink>

            <NavLink to="/admin/viewdiscounts" className="sidebar-link">
              <FaTags /> View Discounts
            </NavLink>

            <NavLink to="/admin/viewproducts" className="sidebar-link">
              <AiOutlineEye /> View Products
            </NavLink>

            <NavLink to="/admin/vieworders" className="sidebar-link">
              <GrPlan /> Orders
            </NavLink>

            <NavLink to="/admin/viewPayments" className="sidebar-link">
              <FaCreditCard /> Payments
            </NavLink>
          </nav>
        </aside>

        {/* Mobile Toggle */}
        <button
          className="sidebar-toggle"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <FaBars />
        </button>

        {/* Main Content */}
        <main className="admin-content">{children}</main>
      </div>
    </>
  );
}

export default Admin;
