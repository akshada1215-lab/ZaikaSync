import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Styles.css";
import {
  BsCartFill,
  BsPersonCircle,
  BsListCheck,
  BsChatDots,
} from "react-icons/bs";
import { useCart } from "../context/CartContext";

function CustomerNavbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const userId = sessionStorage.getItem("userId");
  const { cartCount, fetchCartCount } = useCart();

  // Load cart count when header loads
  React.useEffect(() => {
    fetchCartCount();
  }, []);

  const handleLogout = () => {
    sessionStorage.clear();
    navigate("/login");
  };

  const closeDropdownAndNavigate = (path) => {
    setShowDropdown(false);
    navigate(path);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success px-3">
      <div className="container-fluid">
        {/* Logo */}
        <NavLink className="navbar-brand fw-bold text-white" to="/">
          ZaikaSync
        </NavLink>

        {/* Nav Items */}
        <div className="navbar-collapse show">
          <ul className="navbar-nav ms-auto align-items-lg-center gap-2 mobile-nav">
            {/* Profile Dropdown */}
            <li className="nav-item dropdown">
              <button
                className="btn btn-outline-warning dropdown-toggle"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                <BsPersonCircle className="nav-text ms-1" />
                {userId ? "Profile" : "Sign In"}
              </button>

              {showDropdown && (
                <ul className="dropdown-menu dropdown-menu-end show">
                  {userId ? (
                    <>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() =>
                            closeDropdownAndNavigate(`/editprofile/${userId}`)
                          }
                        >
                          My Profile
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item text-danger"
                          onClick={() => {
                            setShowDropdown(false);
                            handleLogout();
                          }}
                        >
                          Logout
                        </button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => closeDropdownAndNavigate("/login")}
                        >
                          Login
                        </button>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={() => closeDropdownAndNavigate("/register")}
                        >
                          Register
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              )}
            </li>

            {/* Reviews - Public */}
            <li className="nav-item">
              <NavLink to="/reviews" className="btn btn-outline-warning">
                <BsChatDots className="nav-text ms-1" />
                Reviews
              </NavLink>
            </li>

            {/* Orders */}
            {userId && (
              <li className="nav-item">
                <NavLink
                  to={`/orders/${userId}`}
                  className="btn btn-outline-warning"
                >
                  <BsListCheck className="nav-text ms-1" />
                  Orders
                </NavLink>
              </li>
            )}

            {/* Cart */}
            {userId && (
              <li className="nav-item">
                <NavLink
                  to={`/viewcart/${userId}`}
                  className="btn btn-outline-warning position-relative"
                >
                  <BsCartFill />
                  {cartCount > 0 && (
                    <span className="badge bg-danger position-absolute top-0 start-100 translate-middle">
                      {cartCount}
                    </span>
                  )}
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default CustomerNavbar;
