import React, { useState } from "react";
import axios from "axios";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    Designation: "",
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "photo") {
      setFormData({ ...formData, photo: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });
try {
  const response = await axios.post(
    "https://brjobsedu.com/Attendence_portal/api/register/",
    data,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  alert("User registered successfully!");
  console.log(response.data);
} catch (error) {
  // Check if server responded with a status
  if (error.response) {
    console.error("Server responded with error:", error.response.data);
    alert(`Error: ${JSON.stringify(error.response.data)}`);
  }
  // Request was made but no response received
  else if (error.request) {
    console.error("No response received:", error.request);
    alert("No response received from server.");
  }
  // Something happened while setting up the request
  else {
    console.error("Error setting up request:", error.message);
    alert(`Request setup error: ${error.message}`);
  }
  console.log("Full error object:", error);
}
  };
return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="first_name"
        placeholder="First Name"
        value={formData.first_name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="last_name"
        placeholder="Last Name"
        value={formData.last_name}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="phone_number"
        placeholder="Phone Number"
        value={formData.phone_number}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="Designation"
        placeholder="Designation"
        value={formData.Designation}
        onChange={handleChange}
        required
      />
      <input type="file" name="photo" onChange={handleChange} />
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterForm;
