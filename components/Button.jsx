import React from 'react';
import Link from 'next/link';
import '../styles/Button.css';

export default function Button({ href, children }) {
  return (
    <Link href={href} className="unet-btn">
      {children}
    </Link>
  );
}
