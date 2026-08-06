// app/dashboard/page.jsx
"use client";

import { useState } from "react";
import { logoutUser } from "../../lib/auth";

export default function DashboardPage() {
  const [error, setError] = useState(null);

  const handleLogout = async () => {
    const result = await logoutUser();
    if (!result.ok) {
      setError(result.error);
    } else {
      // Redirige al home (app/page.jsx)
      window.location.href = "/";
    }
  };

  return (
    <main style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Dashboard</h1>
      <button
        onClick={handleLogout}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          backgroundColor: "#e74c3c",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
        }}
      >
        Logout
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </main>
  );
}
