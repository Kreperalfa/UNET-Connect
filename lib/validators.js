/* File responsible for performing validations, contains:
    - Validation to ensure emails belong to the university domain
    - Validation for exception emails (developer emails in case of university email system failure)
    - Validation for password security
*/

// Validation for UNET institutional email
export function isUNETEmail(email) {
    return email.toLowerCase().endsWith("@unet.edu.ve");
}

// Validation for allowed exception emails
export function isAllowedEmail(email) {
    const allowedEmails = [
        "milangelloomar@gmail.com",
        "mjaimesmoncada@gmail.com",
    ];
    return allowedEmails.includes(email.toLowerCase());
}

// Validation for secure passwords, checks that it has:
// - At least one uppercase letter
// - At least one number
// - At least one special character
// - Minimum of 6 characters
export function isSecurePassword(password) {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/;
    return regex.test(password);
}
