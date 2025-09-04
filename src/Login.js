import React, { useState } from "react";
import api from "./api";

export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [protectedData, setProtectedData] = useState(null);


  const handleLogin = async () => {
    try {
      const res = await api.post("/api/login/", { email, password });

      console.log("Login Response:", res.data);
      setMessage("✅ Login successful! Cookies stored in browser.");

    } catch (err) {
      console.error("❌ Login failed:", err.response?.data || err.message);
      setMessage("❌ Login failed!");
    }
  };

  // ✅ FETCH PROTECTED API → cookies auto-sent with request
  const fetchProtectedData = async () => {
    try {
      const res = await api.get("/api/Registerpost/21/");

      console.log("Protected API Response:", res.data);
      setProtectedData(res.data);
      setMessage("✅ Protected API fetched successfully!");

    } catch (err) {
      console.error("❌ Protected API error:", {
        error: err.response?.data,
        status: err.response?.status,
        headers: err.response?.headers,
        sentHeaders: err.config?.headers,
      });
      setMessage(`❌ Unauthorized! Status: ${err.response?.status}`);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Auth Test with Cookies</h1>

      {/* ✅ LOGIN FORM */}
      <div>
        <h3>Login</h3>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />

        <button onClick={handleLogin}>Login</button>
        <button onClick={fetchProtectedData}>Fetch Protected API</button>
      </div>

      {/* ✅ SHOW STATUS MESSAGE */}
      {message && (
        <p style={{ marginTop: "10px", color: message.includes("✅") ? "green" : "red" }}>
          {message}
        </p>
      )}

      {/* ✅ SHOW PROTECTED API RESPONSE */}
      {protectedData && (
        <div style={{ marginTop: "10px" }}>
          <h3>Protected API Data</h3>
          <pre style={{ background: "#eee", padding: "10px" }}>
            {JSON.stringify(protectedData, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
