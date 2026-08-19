import { NextResponse } from "next/server";
import { z } from "zod";
import { CONTACT_FROM, CONTACT_TO, getResend } from "@/lib/resend";

const schema = z.object({
  name: z.string().min(2, "Please enter your name").max(80),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().max(120).optional(),
  message: z.string().min(10, "Please write a little more").max(4000),
  company: z.string().optional(), // honeypot — bhara hua matlab bot
});

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Form data is not valid." },
      { status: 400 }
    );
  }

  // honeypot bhara hua hai → silently OK bolo, email mat bhejo
  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  const resend = getResend();
  if (!resend || !CONTACT_TO) {
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 }
    );
  }

  const { name, email, subject, message } = parsed.data;

  try {
    const { error } = await resend.emails.send({
      from: CONTACT_FROM,
      to: CONTACT_TO,
      replyTo: email,
      subject: subject ? `Portfolio: ${subject}` : `Portfolio message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html: `
        <div style="font-family:system-ui,sans-serif;line-height:1.6;color:#0b0b0b">
          <h2 style="margin:0 0 16px">New portfolio message</h2>
          <p style="margin:0 0 4px"><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p style="margin:0 0 4px"><strong>Email:</strong> ${escapeHtml(email)}</p>
          ${subject ? `<p style="margin:0 0 4px"><strong>Subject:</strong> ${escapeHtml(subject)}</p>` : ""}
          <hr style="border:none;border-top:1px solid #e1e0d9;margin:16px 0" />
          <p style="white-space:pre-wrap;margin:0">${escapeHtml(message)}</p>
        </div>
      `,
    });

    if (error) {
      console.error("[contact] resend error:", error);
      return NextResponse.json({ error: "Could not send the email." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] unexpected error:", err);
    return NextResponse.json({ error: "Server error. Please try again later." }, { status: 500 });
  }
}
