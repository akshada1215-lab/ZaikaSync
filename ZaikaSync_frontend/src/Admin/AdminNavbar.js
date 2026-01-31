import React, { useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Navbar, Container, Nav, Badge, Button } from "react-bootstrap";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import "./AdminNavbar.css";

function AdminNavbar() {
  const navigate = useNavigate();
  const userName = sessionStorage.getItem("userName");

  useEffect(() => {
    const logoutChannel = new BroadcastChannel("logout-channel");

    logoutChannel.onmessage = (event) => {
      if (event.data.type === "logout") {
        navigate("/");
      }
    };

    return () => logoutChannel.close();
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.clear();

    const logoutChannel = new BroadcastChannel("logout-channel");
    logoutChannel.postMessage({ type: "logout" });
    logoutChannel.close();

    toast.info("Signed out successfully", { autoClose: 1200 });
    navigate("/");
  };

  return (
    <Navbar className="admin-navbar shadow-sm">
      <Container fluid>
        {/* Brand */}
        <Navbar.Brand as={NavLink} to="/admin" className="admin-logo">
          ZaikaSync
        </Navbar.Brand>

        {/* Right side items */}
        <Nav className="ms-auto align-items-center gap-3 admin-nav">
          {/* Admin Name */}
          <Badge pill className="admin-user-badge">
            <FaUserCircle />
            <span className="nav-text ms-1">{userName}</span>
          </Badge>

          {/* Logout */}
          <Button
            variant="outline-light"
            className="logout-btn"
            onClick={handleLogout}
          >
            <FaSignOutAlt />
            <span className="nav-text ms-1">Logout</span>
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default AdminNavbar;
