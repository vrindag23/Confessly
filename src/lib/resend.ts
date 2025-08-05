import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  throw new Error("❌ RESEND_API_KEY is missing!");
}

export const resend = new Resend(process.env.RESEND_API_KEY);
