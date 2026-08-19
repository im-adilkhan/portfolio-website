import { Resend } from "resend";

/**
 * Client lazily banate hain — module load pe nahi.
 * Resend ka constructor khaali key pe throw karta hai, jo build/dev ko tod deta.
 */
let client: Resend | null = null;

export function getResend() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) return null;
  if (!client) client = new Resend(apiKey);
  return client;
}

export const CONTACT_FROM =
  process.env.CONTACT_FROM_EMAIL?.trim() || "Portfolio <onboarding@resend.dev>";

export const CONTACT_TO = process.env.CONTACT_TO_EMAIL?.trim() || "";
