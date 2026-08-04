import React from 'react';
import '../styles/Button.css'; // reutilizamos el mismo CSS

export default function SubmitButton({ children }) {
  return (
    <button type="submit" className="unet-btn">
      {children}
    </button>
  );
}
