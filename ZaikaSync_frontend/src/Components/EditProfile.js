import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getUserById, updateUser } from "../api/userApi";
import "./EditProfile.css";

function EditProfile() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    contact: "",
    pincode: "",
    address: "",
    password: "",
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUser();
  }, [id]);

  const fetchUser = async () => {
    try {
      const res = await getUserById(id);
      const { userName, email, contact, pincode, address } = res.data;

      setFormData({
        userName,
        email,
        contact,
        pincode,
        address,
        password: "", // NEVER prefill password
      });
    } catch {
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateUser(id, formData);
      toast.success("Profile updated successfully");
      setTimeout(() => navigate("/"), 1500);
    } catch {
      toast.error("Failed to update profile");
    }
  };

  if (loading) {
    return <p className="text-center mt-5">Loading profile...</p>;
  }

  return (
    <>
      <ToastContainer />

      <div className="profile-page">
        <div className="profile-card shadow-lg">
          <h2 className="profile-title">Edit Profile</h2>

          <form onSubmit={handleSubmit}>
            <label>User Name</label>
            <input
              name="userName"
              value={formData.userName}
              onChange={handleChange}
              required
            />

            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <label>Contact</label>
            <input
              name="contact"
              maxLength="10"
              pattern="\d{10}"
              value={formData.contact}
              onChange={handleChange}
              required
            />

            <label>Pincode</label>
            <input
              name="pincode"
              maxLength="6"
              pattern="\d{6}"
              value={formData.pincode}
              onChange={handleChange}
              required
            />

            <label>Address</label>
            <textarea
              name="address"
              rows="3"
              value={formData.address}
              onChange={handleChange}
              required
            />

            <label>New Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Leave blank to keep current password"
            />

            <button type="submit" className="profile-btn">
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default EditProfile;
