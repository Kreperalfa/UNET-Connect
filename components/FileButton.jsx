import React from 'react';
import '../styles/Button.css';

export default function FileButton({ onFileSelect }) {
  const handleChange = (e) => {
    const file = e.target.files[0];
    if (file && onFileSelect) {
      onFileSelect(file);
    }
  };

  return (
    <label className="unet-btn file-btn">
      Choose File
      <input 
        type="file" 
        style={{ display: 'none' }} 
        onChange={handleChange} 
      />
    </label>
  );
}
