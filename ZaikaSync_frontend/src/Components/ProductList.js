import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { getProductsByCategory, addToCart } from "../api/productApi";
import "react-toastify/dist/ReactToastify.css";
import "./ProductList.css";
import { useCart } from "../context/CartContext";

function ProductList() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const { fetchCartCount } = useCart();

  const fetchProducts = async () => {
    try {
      const res = await getProductsByCategory(id);
      const data = res.data.map((p) => ({
        ...p,
        quantity: p.quantity > 0 ? p.quantity : 1,
      }));
      setProducts(data);
      setFilteredProducts(data);
    } catch {
      toast.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [id]);

  useEffect(() => {
    let temp = [...products];

    if (filterType !== "ALL") {
      temp = temp.filter((p) => p.foodType === filterType);
    }

    if (search) {
      temp = temp.filter((p) =>
        p.productName.toLowerCase().includes(search.toLowerCase()),
      );
    }

    setFilteredProducts(temp);
  }, [search, filterType, products]);

  const updateQty = (id, type) => {
    setFilteredProducts((prev) =>
      prev.map((p) =>
        p.productId === id
          ? {
              ...p,
              quantity:
                type === "inc" ? p.quantity + 1 : Math.max(1, p.quantity - 1),
            }
          : p,
      ),
    );
  };

  const handleAdd = async (product) => {
    const userId = sessionStorage.getItem("userId");
    if (!userId) {
      toast.warn("Please login first");
      navigate("/login");
      return;
    }

    try {
      await addToCart({
        userId,
        productId: product.productId,
        quantity: product.quantity,
      });

      toast.success(`${product.productName} added to cart`);
      fetchCartCount();
      fetchProducts();
    } catch {
      toast.error("Insufficient stock");
    }
  };

  if (loading) return <p className="status-text">Loading food items...</p>;

  return (
    <div className="product-page">
      <ToastContainer />

      {/* Filters */}
      <div className="filter-bar">
        <input
          type="text"
          placeholder="Search food..."
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="filter-buttons">
          <button onClick={() => setFilterType("ALL")}>All</button>
          <button className="veg" onClick={() => setFilterType("veg")}>
            Veg
          </button>
          <button className="nonveg" onClick={() => setFilterType("non-veg")}>
            Non-Veg
          </button>
        </div>
      </div>

      {/* Product List */}
      <div className="product-list">
        {filteredProducts.length ? (
          filteredProducts.map((p) => (
            <div className="food-card" key={p.productId}>
              <img
                src={`data:image/png;base64,${p.productImage}`}
                alt={p.productName}
              />

              <div className="food-info">
                <h4>
                  {p.productName}
                  <span
                    className={`badge ${p.foodType === "veg" ? "veg" : "nonveg"}`}
                  >
                    {p.foodType === "veg" ? "Veg" : "Non-Veg"}
                  </span>
                </h4>

                <p className="desc">{p.description}</p>
                <p className="price">₹ {p.price}</p>

                <div className="actions">
                  <div className="qty">
                    <button onClick={() => updateQty(p.productId, "dec")}>
                      −
                    </button>
                    <span>{p.quantity}</span>
                    <button onClick={() => updateQty(p.productId, "inc")}>
                      +
                    </button>
                  </div>

                  <button
                    className={`cart-btn ${!p.isAvailable ? "unavailable" : ""}`}
                    disabled={!p.isAvailable}
                    onClick={() => handleAdd(p)}
                  >
                    {p.isAvailable ? "Add to Cart" : "Unavailable"}
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="status-text">No food items found</p>
        )}
      </div>
    </div>
  );
}

export default ProductList;
