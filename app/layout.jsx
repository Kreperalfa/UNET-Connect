export const metadata = {
  title: 'UNET-Connect',
  description: 'Programming practice website',
  icons: {
    icon: '/favicon.png',   // ✅ ruta dentro de public
  },
}

import Head from 'next/head';

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <Head>
        <title>UNET-Connect</title>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <body>{children}</body>
    </html>
  );
}
