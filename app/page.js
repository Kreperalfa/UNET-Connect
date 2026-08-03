'use client';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import Layout from '../components/Layout';   // ✅ Importa tu Layout

export default function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      const { data, error } = await supabase.from('User').select('*');
      if (error) {
        console.error(error);
        setUsers([]);
      } else {
        setUsers(data || []);
      }
      setLoading(false);
    };
    fetchUsers();
  }, []);

  return (
    <Layout>
      <h1>Usuarios registrados</h1>
      {loading ? (
        <p>Cargando...</p>
      ) : users.length > 0 ? (
        <ul>
          {users.map(u => (
            <li key={u.idUser}>
              {u.name} {u.lastName} - {u.role}
            </li>
          ))}
        </ul>
      ) : (
        <p>No hay usuarios registrados</p>
      )}
    </Layout>
  );
}
