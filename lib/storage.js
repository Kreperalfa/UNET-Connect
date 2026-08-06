import { getSupabaseBrowserClient } from "./supabase";

export async function uploadProfileImage(file, userId, tipo) {
  console.log("BACKEND → FILE RECIBIDO:", file);
  console.log("BACKEND → USER ID:", userId);
  console.log("BACKEND → TIPO:", tipo);

  const supabase = getSupabaseBrowserClient();

  // tipo puede ser: "profile" o "background"
  const filePath = `${userId}/${tipo}.png`; // ✅ carpeta por usuario

  // Subir archivo al bucket
  const { data, error: uploadError } = await supabase.storage
    .from("perfiles")
    .upload(filePath, file, {
      upsert: true, // reemplaza si ya existe
    });

  console.log("UPLOAD RESULT:", data, uploadError);

  if (uploadError) {
    return { ok: false, error: uploadError.message };
  }

  // Obtener URL pública del archivo subido
  const { data: publicData } = supabase.storage
    .from("perfiles")
    .getPublicUrl(filePath);

  return { ok: true, url: publicData.publicUrl };
}
