'use client';
import Layout from '../components/Layout';
import Button from '../components/Button';
import '../styles/Home.css';   // ✅ Importa el CSS separado

export default function Home() {
  return (
    <Layout>
      <div className="welcome">
        <h2>Welcome to UNET Connect</h2>
        <p>
          The academic social network of Universidad Nacional Experimental del Táchira.
          Connect with students, professors, alumni, and share your ideas with the community.
        </p>
        <div className="actions">
          <Button href="/login">Sign In</Button>
          <Button href="/register">Register</Button>
        </div>
      </div>
    </Layout>
  );
}
