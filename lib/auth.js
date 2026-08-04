/* Folder responsible for handling all user authentication logic, including:
    - User login with valid email verification and existence check in Supabase
    - User logout
    - User registration with university email verification
    - OTP verification sent to the email
    - Enable user to change their password
    - Create user password
*/
import { getSupabaseBrowserClient } from './supabase';
import { isUNETEmail, isAllowedEmail } from "./validators";

// Direct login logic: receives email and password, verifies if it is an institutional or allowed email.
// If verification passes, it authenticates the existence in Supabase.
export async function loginUser(email, password) {
    const supabase = getSupabaseBrowserClient();
    if (!isUNETEmail(email) && !isAllowedEmail(email)) {
        return { ok: false, error: "Email not allowed" };
    }
    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    if (error) {
        return { ok: false, error: "Error logging in" };
    }
    return { ok: true };
}

// Logs out the user. If an error occurs, returns false and the exception.
export async function logoutUser() {
    const supabase = getSupabaseBrowserClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
        return { ok: false, error: "Error logging out" };
    }
    return { ok: true };
}

// Registers a user. First verifies if the email is allowed, then sends data to Supabase to send OTP.
export async function registerUser(email) {
    const supabase = getSupabaseBrowserClient();
    if (!isUNETEmail(email)) {
        return { ok: false, error: "Email not allowed" };
    }
    const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
            shouldCreateUser: true
        }
    });
    if (error) {
        return { ok: false, error: "Error sending OTP: " + error.message };
    }
    return { ok: true };
}

// Verifies the OTP code sent to the user's email. Receives email and OTP entered by the user.
// Validates the token with Supabase and confirms ownership of the email.
export async function verifyOtpCode(email, otp) {
    const supabase = getSupabaseBrowserClient();
    const { error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: "email",
    });
    if (error) {
        return { ok: false, error: "Incorrect code" };
    }
    return { ok: true };
}

// Sends OTP for password change. Verifies institutional email, then requests Supabase to send OTP.
// Unlike registration, here no new user is created. If user does not exist or error occurs, returns exception.
export async function sendOtpForPasswordChange(email) {
    const supabase = getSupabaseBrowserClient();
    if (!isUNETEmail(email)) {
        return { ok: false, error: "Email not allowed" };
    }
    const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
            shouldCreateUser: false,
        },
    });
    if (error) {
        if (error.message.includes("User not found")) {
            return { ok: false, error: "This email is not registered" };
        }
        return { ok: false, error: "Error sending OTP: " + error.message };
    }
    return { ok: true };
}

// Logic for creating a password. Receives the new password and updates the authenticated user in Supabase.
// If an error occurs, returns false with the message. If successful, returns true.
export async function createUserPassword(password) {
    const supabase = getSupabaseBrowserClient();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
        return { ok: false, error: "Error saving password" };
    }
    return { ok: true };
}
