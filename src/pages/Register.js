import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = () => {
    if (!username || !email || !password) {
      setMessage("⚠️ Please fill in all fields");
      return;
    }

    if (password.length < 6) {
      setMessage("❌ Password must be at least 6 characters");
      return;
    }

    setMessage("✅ Registration successful!");

    setTimeout(() => navigate("/"), 800);
  };

  return (
    <div className="login-container">
      <div className="login-card">

        <h1 className="title">ZakatNow</h1>
        <p className="subtitle">Create new account</p>

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

          <label>Username</label>
          <input value={username} onChange={(e) => setUsername(e.target.value)} />

          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />

          <label>Password</label>
          <input type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="button" className="btn-dark" onClick={handleRegister}>
            Register
          </button>

          <button type="reset" className="btn-outline">
            Reset
          </button>

        </form>

        <p style={{ textAlign: "center", marginTop: "10px" }}>
          Already have an account?{" "}
          <span
            style={{ color: "#8b6526", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}

export default Register;