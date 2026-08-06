'use client';
import { useState } from 'react';
import SubmitButton from '../../components/SubmitButton';
import SelectField from '../../components/SelectField';
import SuccessAlert from '../../components/SuccessAlert';
import ErrorAlert from '../../components/ErrorAlert';
import { registerUser, verifyOtpCode } from '../../lib/auth';
import { createUserProfile } from '../../lib/profile';
import { getSupabaseBrowserClient } from '../../lib/supabase';
import { isSecurePassword } from '../../lib/validators';
import '../../styles/Register.css';

export default function Register() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [status, setStatus] = useState("");
  const [step, setStep] = useState("email");

  // Campos del perfil
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [bio, setBio] = useState("");
  const [semester, setSemester] = useState(1);
  const [careerDepartament, setCareerDepartament] = useState("");
  const [role, setRole] = useState("student");

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
      setStep("profile");
    }
  }

  async function handleCreateProfile(e) {
    e.preventDefault();

    // Validaciones
    if (!name || !lastName || !bio || !careerDepartament || !role || !password || !passwordConfirm) {
      setStatus("❌ All fields are required.");
      return;
    }

    const semValue = parseInt(semester, 10);
    if (isNaN(semValue) || semValue < 1 || semValue > 10) {
      setStatus("❌ Semester must be an integer between 1 and 10.");
      return;
    }

    if (password !== passwordConfirm) {
      setStatus("❌ Passwords do not match.");
      return;
    }

    if (!isSecurePassword(password)) {
      setStatus("❌ Password is not secure. Must contain uppercase, number, special character and min 6 chars.");
      return;
    }

    const supabase = getSupabaseBrowserClient();
    const perfilDefault = supabase.storage.from("perfiles").getPublicUrl("profile.png").data.publicUrl;
    const fondoDefault = supabase.storage.from("perfiles").getPublicUrl("background.jpg").data.publicUrl;

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signUpError) {
      setStatus(`❌ Error creating user: ${signUpError.message}`);
      return;
    }

    const result = await createUserProfile({
      emailVerified: email,
      name,
      lastName,
      bio,
      semester,
      careerDepartament,
      role,
      profileImage: perfilDefault,
      backgroundImage: fondoDefault
    });

    if (!result.ok) {
      setStatus(result.error);
    } else {
      setStatus("✅ Profile created successfully");
      // window.location.href = "/dashboard";
    }
  }

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Create Your Account</h2>

        {step === "email" && (
          <form className="register-form" onSubmit={handleSendCode}>
            <label htmlFor="email">University Email</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your institutional email (example@unet.edu.ve)"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <SubmitButton>Send Code</SubmitButton>
          </form>
        )}

        {step === "otp" && (
          <form className="register-form" onSubmit={handleVerifyCode}>
            <label htmlFor="otp">Verification Code</label>
            <input
              id="otp"
              type="text"
              placeholder="Enter the code sent to your email"
              required
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="otp-input"
            />
            <SubmitButton>Verify Code</SubmitButton>
          </form>
        )}

        {step === "profile" && (
          <form className="register-form" onSubmit={handleCreateProfile}>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter a secure password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <label htmlFor="passwordConfirm">Confirm Password</label>
            <input
              id="passwordConfirm"
              type="password"
              placeholder="Confirm your password"
              required
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />

            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              placeholder="Enter your first and middle name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              type="text"
              placeholder="Enter your first and second last name"
              required
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />

            <label htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              placeholder="Write a short description about yourself"
              required
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />

            <label htmlFor="semester">Semester</label>
            <input
              id="semester"
              type="number"
              min="1"
              max="10"
              step="1"
              placeholder="Enter your current semester (1-10)"
              required
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
            />

            <SelectField
              id="careerDepartament"
              label="Career Departament"
              value={careerDepartament}
              onChange={setCareerDepartament}
              options={[
                { value: "Industrial Engineering", label: "Industrial Engineering" },
                { value: "Mechanical Engineering", label: "Mechanical Engineering" },
                { value: "Agricultural Engineering", label: "Agricultural Engineering" },
                { value: "Animal Production Engineering", label: "Animal Production Engineering" },
                { value: "Agroindustrial Engineering", label: "Agroindustrial Engineering" },
                { value: "Electronic Engineering", label: "Electronic Engineering" },
                { value: "Computer Engineering", label: "Computer Engineering" },
                { value: "Environmental Engineering", label: "Environmental Engineering" },
                { value: "Civil Engineering", label: "Civil Engineering" },
                { value: "Architecture", label: "Architecture" },
                { value: "Bachelor in Music", label: "Bachelor in Music" },
                { value: "Bachelor in Psychology", label: "Bachelor in Psychology" },
                { value: "TSU in Sports Training", label: "TSU in Sports Training" }
              ]}
              required
            />

            <SelectField
              id="role"
              label="Role"
              value={role}
              onChange={setRole}
              options={[
                { value: "student", label: "Student" },
                { value: "professor", label: "Professor" },
                { value: "tutor", label: "Tutor" },
                { value: "graduate", label: "Graduate" },
                { value: "administrative_staff", label: "Administrative Staff" }
              ]}
              required
            />

            <SubmitButton>Create Profile</SubmitButton>
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
