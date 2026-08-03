import React from 'react';
import '../styles/Layout.css';

export default function Layout({ children }) {
  return (
    <div className="layout">
      <header className="header">
        <h1>UNET Connect</h1>
      </header>
      <main className="content">{children}</main>
      <footer className="footer">
        <p>© Universidad Nacional Experimental del Táchira</p>
      </footer>
    </div>
  );
}
