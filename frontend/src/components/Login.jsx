import { useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/auth";

function Login({ onLogin, onShowRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(`${API}/login`, {
        email,
        password
      });

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user)
      );

      onLogin(response.data.user);

    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Login failed"
      );
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-logo">
          ✓
        </div>

        <h1>Welcome Back</h1>

        <p className="auth-subtitle">
          Login to manage your tasks
        </p>

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        <form onSubmit={submit}>

          <label>Email</label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <label>Password</label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <button
            type="submit"
            className="auth-button"
          >
            Login
          </button>

        </form>

        <p className="auth-switch">
          Don't have an account?

          <button
            type="button"
            onClick={onShowRegister}
          >
            Create Account
          </button>
        </p>

      </div>

    </div>
  );
}

export default Login;