'use client';
import { useState } from 'react';
import SubmitButton from '../../components/SubmitButton';
import SuccessAlert from '../../components/SuccessAlert';
import ErrorAlert from '../../components/ErrorAlert';

import { sendOtpForPasswordChange, verifyOtpCode, createUserPassword } from '../../lib/auth';
import '../../styles/Recover-password.css';

export default function RecoverPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState("");
  const [step, setStep] = useState("email");

  async function handleSendCode(e) {
    e.preventDefault();
    const result = await sendOtpForPasswordChange(email);

    if (!result.ok) {
      setStatus("❌ " + result.error);
    } else {
      setStatus("✅ OTP sent to your email");
      setStep("otp");
    }
  }

  async function handleVerifyCode(e) {
    e.preventDefault();
    const result = await verifyOtpCode(email, otp);

    if (!result.ok) {
      setStatus("❌ Incorrect code");
    } else {
      setStatus("✅ Code verified");
      setStep("password");
    }
  }

  async function handleChangePassword(e) {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      setStatus("❌ All fields are required");
      return;
    }

    if (newPassword !== confirmPassword) {
      setStatus("❌ Passwords do not match");
      return;
    }

    const result = await createUserPassword(newPassword);

    if (!result.ok) {
      setStatus("❌ Error saving password: " + result.error);
    } else {
      setStatus("✅ Password updated successfully");
      window.location.href = "/log-in";
    }
  }

  return (
    <div className="recover-container">
      <div className="recover-box">
        <h2>Recover Password</h2>

        {step === "email" && (
          <form className="recover-form" onSubmit={handleSendCode}>
            <label htmlFor="email">University Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your institutional email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <SubmitButton>Send OTP</SubmitButton>
          </form>
        )}

        {step === "otp" && (
          <form className="recover-form" onSubmit={handleVerifyCode}>
            <label htmlFor="otp">Verification Code</label>
            <input
              id="otp"
              type="text"
              placeholder="Enter the code sent to your email"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <SubmitButton>Verify Code</SubmitButton>
          </form>
        )}

        {step === "password" && (
          <form className="recover-form" onSubmit={handleChangePassword}>
            <label htmlFor="newPassword">New Password</label>
            <input
              id="newPassword"
              type="password"
              placeholder="Enter your new password"
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />

            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your new password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <SubmitButton>Save Password</SubmitButton>
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
