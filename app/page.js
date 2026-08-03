"use client";

import { useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Home() {
  useEffect(() => {
    const testConnection = async () => {
      const { data, error } = await supabase
        .from("User") // 👈 cambia "usuarios" por el nombre real de tu tabla
        .select("*")
        .limit(5);

      if (error) {
        console.error("❌ Error en la conexión:", error.message);
      } else {
        console.log("✅ Conexión exitosa, datos recibidos:", data);
      }
    };

    testConnection();
  }, []);

  return <h1>Bienvenido a RedUNET</h1>;
}
