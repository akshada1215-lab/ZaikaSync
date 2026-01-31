import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Admin from "./Admin";
import { addCategory } from "../api/categoryApi";
import "./AddCategory.css";

function AddCategory() {
  const [categoryName, setCategoryName] = useState("");
  const [categoryImage, setCategoryImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");

  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  const maxSize = 2 * 1024 * 1024; // 2MB

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    //  Type validation
    if (!allowedTypes.includes(file.type)) {
      setError("Only JPG, PNG or WEBP images are allowed");
      setCategoryImage(null);
      setPreview(null);
      return;
    }

    //  Size validation
    if (file.size > maxSize) {
      setError("Image size must be less than 2MB");
      setCategoryImage(null);
      setPreview(null);
      return;
    }

    setError("");
    setCategoryImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName || !categoryImage) {
      setError("Category name and image are required");
      return;
    }

    const formData = new FormData();
    formData.append("name", categoryName);
    formData.append("image", categoryImage);
    console.log(formData);



    try {
      await addCategory(formData);
      toast.success("Category added successfully!");

      // Reset form
      setCategoryName("");
      setCategoryImage(null);
      setPreview(null);
      setError("");
    } catch {
      toast.error("Failed to add category");
    }
  };

  return (
    <Admin>
      <ToastContainer />
      <div className="add-category-wrapper">
        <div className="add-category-card">
          <h3 className="title">Add New Category</h3>

          <form onSubmit={handleSubmit}>
            <label>Category Name</label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter category name"
            />

            <label>Category Image</label>
            <input
              type="file"
              accept="image/jpeg, image/png, image/webp"
              onChange={handleImageChange}
            />

            {preview && (
              <div className="image-preview">
                <img src={preview} alt="Preview" />
              </div>
            )}

            {error && <p className="error-message">{error}</p>}

            <button type="submit" className="submit-btn">
              Add Category
            </button>
          </form>
        </div>
      </div>
    </Admin>
  );
}

export default AddCategory;

