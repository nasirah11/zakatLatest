import React, { useState } from "react";
import "../Styles/Login.css";

function Register({ onRegisterSuccess, onBackToLogin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = () => {
    if (!username || !email || !password || !confirmPassword) {
      setMessage("⚠️ Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      setMessage("❌ Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("❌ Passwords do not match");
      return;
    }

    setMessage("✅ Registration successful!");
    setTimeout(() => {
      // Store registration and auto-login
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userName", username);
      onRegisterSuccess();
    }, 800);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleRegister();
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="title">🕌 ZakatNow</h1>
        <p className="subtitle">Create new account</p>

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
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleKeyPress}
          />

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
            placeholder="Enter your password (min 6 chars)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
          />

          <label>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onKeyPress={handleKeyPress}
          />

          <button className="btn-dark" onClick={handleRegister}>
            Register
          </button>

          <button
            type="button"
            className="btn-outline"
            onClick={() => {
              setUsername("");
              setEmail("");
              setPassword("");
              setConfirmPassword("");
              setMessage("");
            }}
          >
            Reset
          </button>
        </div>

        <p style={{ textAlign: "center", marginTop: "15px", color: "#423417" }}>
          Already have an account?{" "}
          <span
            style={{ color: "#8b6526", cursor: "pointer", fontWeight: "600" }}
            onClick={onBackToLogin}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
