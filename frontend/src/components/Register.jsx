import { useState } from "react";
import axios from "axios";

const API = "http://localhost:5000/api/auth";

function Register({ onShowLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const submit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      const response = await axios.post(`${API}/register`, {
        name,
        email,
        password
      });

      setSuccess(
        response.data.message ||
        "Registration successful! You can now login."
      );

      setName("");
      setEmail("");
      setPassword("");

    } catch (error) {
      console.log("REGISTER ERROR:", error);

      if (error.response) {
        setError(
          error.response.data?.message ||
          `Server error: ${error.response.status}`
        );
      } else if (error.request) {
        setError(
          "Cannot connect to server. Make sure backend is running on port 5000."
        );
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <div className="auth-logo">
          ✓
        </div>

        <h1>Create Account</h1>

        <p className="auth-subtitle">
          Start managing your tasks
        </p>

        {error && (
          <div className="auth-error">
            {error}
          </div>
        )}

        {success && (
          <div className="auth-success">
            {success}
          </div>
        )}

        <form onSubmit={submit}>

          <label>Name</label>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            required
          />

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
            placeholder="Minimum 6 characters"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            minLength="6"
            required
          />

          <button
            type="submit"
            className="auth-button"
          >
            Create Account
          </button>

        </form>

        <p className="auth-switch">
          Already have an account?

          <button
            type="button"
            onClick={onShowLogin}
          >
            Login
          </button>
        </p>

      </div>

    </div>
  );
}

export default Register;