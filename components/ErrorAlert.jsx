'use client';
import React from 'react';
import '../styles/Alert.css';

export default function ErrorAlert({ message }) {
  return (
    <div className="alert error-alert">
      <p>{message}</p>
    </div>
  );
}
