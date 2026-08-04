'use client';
import { useState } from 'react';
import SubmitButton from '../../components/SubmitButton';
import '../../styles/Register.css';
import { registerUser, verifyOtpCode } from '../../lib/auth';
import SuccessAlert from '../../components/SuccessAlert';
import ErrorAlert from '../../components/ErrorAlert';

export default function Register() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [status, setStatus] = useState("");
  const [step, setStep] = useState("email");

  async function handleSendCode(e) {
    e.preventDefault();

    const result = await registerUser(email);

    if (!result.ok) {
      setStatus(result.error);
    } else {
      setStatus("✅ Code sent to your email");
      setStep("otp");
    }
  }

  async function handleVerifyCode(e) {
    e.preventDefault();

    const result = await verifyOtpCode(email, otp);

    if (!result.ok) {
      setStatus(result.error);
    } else {
      setStatus("✅ Email verified successfully");
      // Aquí puedes redirigir al dashboard
    }
  }

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Create Your Account</h2>

        {step === "email" && (
          <form className="register-form" onSubmit={handleSendCode}>
            <label htmlFor="email">Enter your university email</label>
            <p><strong>After entering it we will send you a code for verification</strong></p>

            <input
              id="email"
              type="email"
              placeholder="email.example@unet.edu.ve"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <SubmitButton>Send Code</SubmitButton>
          </form>
        )}

        {step === "otp" && (
          <form className="register-form" onSubmit={handleVerifyCode}>
            <label htmlFor="otp">Enter the verification code</label>
            <p><strong>After entering it we will verify your code</strong></p>

            <input
              id="otp"
              type="text"
              placeholder="Enter code"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="otp-input"
            />

            <SubmitButton>Verify Code</SubmitButton>
          </form>
        )}

        {status && (
          status.startsWith("✅")
            ? <SuccessAlert message={status} />
            : <ErrorAlert message={status} />
        )}
      </div>
    </div>
  );
}
