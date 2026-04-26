import React, { useState } from "react";
import "../Styles/Login.css";

function Login({ onLoginSuccess, onGoToRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setMessage("⚠️ Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      setMessage("❌ Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    setMessage("");

    // Simulate API call
    setTimeout(() => {
      setMessage("✅ Login successful!");
      setTimeout(() => {
        // Store login state
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", email);
        onLoginSuccess();
      }, 800);
    }, 1000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleLogin();
    }
  };

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setMessage("");
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="title">🕌 ZakatNow</h1>
        <p className="subtitle">Welcome back! Please sign in to your account</p>

        {message && (
          <div className={`message ${message.includes("✅") ? "success" : message.includes("⚠️") ? "warning" : "error"}`}>
            {message}
          </div>
        )}

        <form className="login-form" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              autoComplete="email"
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="btn-dark"
            disabled={isLoading}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>

          <button
            type="button"
            className="btn-outline"
            onClick={resetForm}
            disabled={isLoading}
          >
            Clear Form
          </button>
        </form>

        <div className="auth-link">
          Don't have an account?{" "}
          <span onClick={onGoToRegister}>Create one now</span>
        </div>
      </div>
    </div>
  );
}

export default Login;
