import { getSupabaseBrowserClient } from "./supabase";
import { uploadProfileImage } from "./storage";

/* ============================================================
   CREATE USER PROFILE
   ============================================================ */
export async function createUserProfile({ emailVerified, name, lastName, careerDepartament, semester, bio, profileImage, backgroundImage, role }) {
  const supabase = getSupabaseBrowserClient();

  const { data: userData } = await supabase.auth.getUser();
  const user = userData?.user;

  if (!user) return { ok: false, error: "No authenticated user" };

  // ✅ Use the verified email from OTP
  const mailUNET = emailVerified;

  // ✅ Default images desde el bucket
  const perfilDefault = supabase.storage
    .from("perfiles")
    .getPublicUrl("profile.png").data.publicUrl;

  const fondoDefault = supabase.storage
    .from("perfiles")
    .getPublicUrl("background.jpg").data.publicUrl;

  let profileUrl = perfilDefault;
  let backgroundUrl = fondoDefault;

  if (profileImage) {
    const { ok, url } = await uploadProfileImage(profileImage, user.id, "profile");
    if (ok) profileUrl = url;
  }

  if (backgroundImage) {
    const { ok, url } = await uploadProfileImage(backgroundImage, user.id, "background");
    if (ok) backgroundUrl = url;
  }

  const { error } = await supabase.from("User").insert({
    idUser: user.id,
    name,
    lastName,
    mailUNET,
    role,
    careerDepartament,
    semester,
    bio,
    profileImage: profileUrl,
    backgroundImage: backgroundUrl,
    stattus: "active",
    bannedUntil: null
  });

  return { ok: !error, error };
}

/* ============================================================
   LOAD USER PROFILE
   ============================================================ */
export async function loadUserProfile() {
  const supabase = getSupabaseBrowserClient();

  const { data: userData, error: userError } = await supabase.auth.getUser();
  const user = userData?.user;

  if (userError || !user) {
    return { ok: false, error: "No authenticated user" };
  }

  const { data, error } = await supabase
    .from("User")
    .select("*")
    .eq("idUser", user.id)
    .single();

  if (error) {
    return { ok: false, error: error.message };
  }

  return { ok: true, profile: data, user };
}

/* ============================================================
   UPDATE USER PROFILE
   ============================================================ */
export async function updateUserProfile({ name, lastName, careerDepartament, semester, bio, profileImage, backgroundImage }) {
  const supabase = getSupabaseBrowserClient();

  const { data: userData } = await supabase.auth.getUser();
  const user = userData?.user;

  if (!user) return { ok: false, error: "No authenticated user" };

  const { data: currentProfile } = await supabase
    .from("User")
    .select("*")
    .eq("idUser", user.id)
    .single();

  let profileUrl = currentProfile.profileImage || supabase.storage.from("perfiles").getPublicUrl("profile.png").data.publicUrl;
  let backgroundUrl = currentProfile.backgroundImage || supabase.storage.from("perfiles").getPublicUrl("background.jpg").data.publicUrl;

  if (profileImage) {
    const upload = await uploadProfileImage(profileImage, user.id, "profile");
    if (upload.ok) profileUrl = upload.url;
  }

  if (backgroundImage) {
    const upload = await uploadProfileImage(backgroundImage, user.id, "background");
    if (upload.ok) backgroundUrl = upload.url;
  }

  const { error } = await supabase
    .from("User")
    .update({
      name,
      lastName,
      careerDepartament,
      semester,
      bio,
      profileImage: profileUrl,
      backgroundImage: backgroundUrl,
    })
    .eq("idUser", user.id);

  return { ok: !error, error };
}
