import { Resend } from "resend";
import VerificationEmail from "@/emails/VerificationEmail";

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function sendVerificationEmail(
  email: string,
  username: string,
  otp: string
) {
  try {
    const response = await resend.emails.send({
      from: "Mystery App <onboarding@resend.dev>",
      to: email,
      subject: "Your Verification Code",
      react: VerificationEmail({ username, otp }),
    });

    console.log("✅ Email sent:", response);

    return { success: true, message: "Email sent successfully" };
  } catch (err: any) {
    console.error("❌ Email send failed:", err);
    return { success: false, message: err.message || "Failed to send email" };
  }
}
