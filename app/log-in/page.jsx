'use client';
import { useState } from 'react';
import SubmitButton from '../../components/SubmitButton'; // ✅ usar este
import '../../styles/Log-in.css';
import { loginUser, sendOtpForPasswordChange } from '../../lib/auth';
import SuccessAlert from '../../components/SuccessAlert';
import ErrorAlert from '../../components/ErrorAlert';

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    const result = await loginUser(email, password);
    if (!result.ok) {
      setStatus("❌ Login failed: " + result.error);
    } else {
      setStatus("✅ Logged in successfully");
      window.location.href = "/dashboard"; // ✅ redirige al dashboard
    }
  }

  async function handleForgotPassword(e) {
    e.preventDefault();
    const result = await sendOtpForPasswordChange(email);
    if (!result.ok) {
      setStatus(result.error);
    } else {
      setStatus("✅ OTP sent to your email for password recovery");
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Log In</h2>
        <form className="login-form" onSubmit={handleLogin}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* ✅ Botón correcto */}
          <SubmitButton>Log In</SubmitButton>
        </form>

        <form onSubmit={handleForgotPassword} className="forgot-container">
          <SubmitButton>Forgot your password?</SubmitButton>
        </form>

        {status && (
          status.startsWith("✅")
            ? <SuccessAlert message={status} />
            : <ErrorAlert message={status} />
        )}
      </div>
    </div>
  );
}
