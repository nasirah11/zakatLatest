import React, { useState } from "react";
import "../Styles/Login.css";

function Login({ onLoginSuccess, onGoToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      setMessage("⚠️ Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      setMessage("❌ Password must be at least 6 characters");
      return;
    }

    setMessage("✅ Login successful!");
    setTimeout(() => {
      // Store login state
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);
      onLoginSuccess();
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="title">🕌 ZakatNow</h1>
        <p className="subtitle">Login to your account</p>

        {message && (
          <p
            style={{
              textAlign: "center",
              color: message.includes("✅") ? "green" : "red",
              fontWeight: "500",
              marginBottom: "15px",
            }}
          >
            {message}
          </p>
        )}

        <div className="login-form">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={handleKeyPress}
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
          />

          <button className="btn-dark" onClick={handleLogin}>
            Login
          </button>

          <button
            type="button"
            className="btn-outline"
            onClick={() => {
              setEmail("");
              setPassword("");
              setMessage("");
            }}
          >
            Reset
          </button>
        </div>

        <p style={{ textAlign: "center", marginTop: "15px", color: "#423417" }}>
          Don't have an account?{" "}
          <span
            style={{ color: "#8b6526", cursor: "pointer", fontWeight: "600" }}
            onClick={onGoToRegister}
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
