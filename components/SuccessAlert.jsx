'use client';
import React from 'react';
import '../styles/Alert.css';

export default function SuccessAlert({ message }) {
  return (
    <div className="alert success-alert">
      <p>{message}</p>
    </div>
  );
}
