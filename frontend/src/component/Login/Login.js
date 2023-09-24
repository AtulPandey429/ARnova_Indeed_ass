import React, { useState } from "react";
import axios from "axios"; // Import Axios
import { useNavigate } from "react-router-dom";
import "./Login.css";
function LoginForm({ onLogin }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Make an HTTP POST request to your backend API
      const response = await axios.post("/api/user/login", formData);

      if (response.status === 200) {
        // Successful login
        const userData = response.data; // Assuming your response contains user data
        alert("Login successful!");
        onLogin(userData); // Pass user data to onLogin
        navigate("/home");
      } else {
        // Handle other responses (e.g., authentication failed)
        alert("Login failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle errors (e.g., network error)
      alert("An error occurred during login.");
    }
  };

  return (
    <div className="login-form-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="mobileNumber">Mobile Number:</label>
          <input
            type="tel"
            id="mobileNumber"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginForm;
