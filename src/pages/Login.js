import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

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
    setTimeout(() => navigate("/business"), 800);
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <h1 className="title">ZakatNow</h1>
        <p className="subtitle">Login to your account</p>

        {message && (
          <p style={{
            textAlign: "center",
            color: message.includes("✅") ? "green" : "red",
            fontWeight: "500"
          }}>
            {message}
          </p>
        )}

        <form className="login-form">

          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />

          <label>Password</label>
          <input type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="button" className="btn-dark" onClick={handleLogin}>
            Login
          </button>

          <button type="reset" className="btn-outline">
            Reset
          </button>

        </form>

        <p style={{ textAlign: "center", marginTop: "10px" }}>
          Don’t have an account?{" "}
          <span
            style={{ color: "#8b6526", cursor: "pointer" }}
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;