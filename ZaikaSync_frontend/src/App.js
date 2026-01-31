import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { getCartByUserId } from "./api/cartApi";
import axios from "axios";

// Import Components
import Home from "./Components/Home";
import Login from "./Components/Login";
import Register from "./Components/Register";
import ProductList from "./Components/ProductList";
import CustomerNavbar from "./Components/CustomerNavbar";
import Cart from "./Components/Cart";
import Payment from "./Components/Payment";
import Orders from "./Components/Orders";
import Reviews from "./Components/Reviews";
import AddReview from "./Components/AddReview";
import ForgotPassword from "./Components/ForgotPassword";
import ResetPassword from "./Components/ResetPassword";

// Admin Components
import Admin from "./Admin/Admin";
import AddCategory from "./Admin/AddCategory";
import AddProduct from "./Admin/AddProduct";
import ViewProducts from "./Admin/ViewProducts";
import ViewOrders from "./Admin/ViewOrders";
import ViewPayments from "./Admin/ViewPayments";
import EditProduct from "./Admin/EditProduct";
import EditProfile from "./Components/EditProfile";
import AddDiscount from "./Admin/AddDiscount";
import ViewDiscount from "./Admin/ViewDiscount";


function App() {
  const [cartCount, setCartCount] = useState(0);
  const userId = sessionStorage.getItem("userId");


  // Fetch cart count on page load
  useEffect(() => {
    if (!userId) {
      setCartCount(0);
      return;
    }

    const fetchCartCount = async () => {
      try {
        const response = await getCartByUserId(userId);
        setCartCount(response.data?.length || 0);
      } catch (error) {
        console.error("Error fetching cart count:", error);
        setCartCount(0);
      }
    };

    fetchCartCount();
  }, [userId]);

  // Helper component to conditionally show CustomerNavbar
  const AppLayout = ({ children }) => {
    const location = useLocation();

    // Check if current path includes "admin"
    const isAdminRoute = location.pathname.startsWith("/admin");

    return (
      <>
        {!isAdminRoute && <CustomerNavbar cartCount={cartCount} />}
        {children}
      </>
    );
  };

  return (
    <div className="App">
      <Router>
        <AppLayout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
           
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Product List with cart count handler */}
            <Route
              path="/products/:id"
              element={<ProductList setCartCount={setCartCount} />}
            />

            {/* Admin Routes */}
            <Route path="/admin" element={<AddCategory />} />
            <Route path="/admin/addcategory" element={<AddCategory />} />
            <Route path="/admin/addproducts" element={<AddProduct />} />
            <Route path="/admin/viewproducts" element={<ViewProducts />} />
            <Route path="/admin/vieworders" element={<ViewOrders />} />
            <Route path="/admin/viewPayments" element={<ViewPayments />} />
            <Route path="/admin/adddiscount" element={<AddDiscount />} />
            <Route path="/admin/viewdiscounts" element={<ViewDiscount />} />
            <Route
              path="/admin/editproduct/:id"
              element={<EditProduct />}
            ></Route>

            {/* Cart and Payment */}
            <Route
              path="/viewcart/:userId"
              element={<Cart setCartCount={setCartCount} />}
            />
            <Route
              path="/customer/cart"
              element={<Cart setCartCount={setCartCount} />}
            />
            <Route path="/payment" element={<Payment />} />
            <Route path="/orders/:userId" element={<Orders />} />
            <Route path="/editprofile/:id" element={<EditProfile />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/customer/addreview" element={<AddReview />} />
            <Route path="/forgotpassword" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </AppLayout>
      </Router>
    </div>
  );
}

export default App;
