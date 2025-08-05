import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const ADMIN_EMAIL = "itzvrinda2310@gmail.com";

export async function sendVerificationEmailForAdmin(
  newUserEmail: string,
  username: string,
  otp: string
) {
  try {
    
    await resend.emails.send({
      from: "Mystery Message <onboarding@resend.dev>",
      to: ADMIN_EMAIL,
      subject: "New Signup Request - Verify User",
      html: `
        <h2>New Signup Request</h2>
        <p><strong>Username:</strong> ${username}</p>
        <p><strong>Email entered by user:</strong> ${newUserEmail}</p>
        <p><strong>Verification OTP:</strong> ${otp}</p>
        <p>Share this OTP only if you want to approve the signup.</p>
      `,
    });

    return { success: true, message: "Signup request sent to admin email" };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, message: "Failed to send verification email" };
  }
}
