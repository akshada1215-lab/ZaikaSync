import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllCategories } from "../api/categoryApi";
import "./Category.css";

function Category() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getAllCategories();
        setCategories(response.data);
      } catch {
        setError("No categories available");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId) => {
    navigate(`/products/${categoryId}`);
  };

  if (loading) return <p className="category-status">Loading categories...</p>;
  if (error) return <p className="category-status">{error}</p>;

  return (
    <div className="category-container">
      {categories.map((category) => (
        <div
          key={category.categoryId}
          className="category-item"
          onClick={() => handleCategoryClick(category.categoryId)}
        >
          <div className="category-image-wrapper">
            <img
              src={`data:image/*;base64,${category.image}`}
              alt={category.name}
              className="category-img"
            />
          </div>
          <p className="category-name">{category.name}</p>
        </div>
      ))}
    </div>
  );
}

export default Category;
