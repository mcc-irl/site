import { NextRequest, NextResponse } from "next/server";

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  message?: string;
  website?: string;
};

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const requestTimestampsByIp = new Map<string, number[]>();

function getClientIp(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() ?? "unknown";
  }

  return "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const recent = (requestTimestampsByIp.get(ip) ?? []).filter((time) => now - time < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestTimestampsByIp.set(ip, recent);
    return true;
  }

  recent.push(now);
  requestTimestampsByIp.set(ip, recent);
  return false;
}

function normalizeText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function validate(payload: ContactPayload) {
  const name = normalizeText(payload.name);
  const email = normalizeText(payload.email);
  const phone = normalizeText(payload.phone);
  const service = normalizeText(payload.service);
  const message = normalizeText(payload.message);
  const website = normalizeText(payload.website);

  if (website.length > 0) {
    return { valid: false as const, message: "Spam detected." };
  }

  if (!name || name.length > 120) {
    return { valid: false as const, message: "Please provide a valid name." };
  }

  if (!email || email.length > 120 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { valid: false as const, message: "Please provide a valid email address." };
  }

  if (phone.length > 40) {
    return { valid: false as const, message: "Phone number is too long." };
  }

  if (!service || service.length > 120) {
    return { valid: false as const, message: "Please choose a service." };
  }

  if (!message || message.length > 2000) {
    return { valid: false as const, message: "Please provide a valid message." };
  }

  return {
    valid: true as const,
    data: {
      name,
      email,
      phone,
      service,
      message,
    },
  };
}

async function sendResendEmail(input: {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}) {
  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

  if (!resendApiKey || !toEmail) {
    return {
      ok: false,
      message: "Contact service is not configured yet.",
    };
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: fromEmail,
      to: [toEmail],
      reply_to: input.email,
      subject: `New enquiry: ${input.service}`,
      text: [
        "New website enquiry",
        "",
        `Name: ${input.name}`,
        `Email: ${input.email}`,
        `Phone: ${input.phone || "Not provided"}`,
        `Service: ${input.service}`,
        "",
        "Message:",
        input.message,
      ].join("\n"),
    }),
  });

  if (!response.ok) {
    return {
      ok: false,
      message: "Unable to send your enquiry right now.",
    };
  }

  return { ok: true };
}

export async function POST(request: NextRequest) {
  const clientIp = getClientIp(request);

  if (isRateLimited(clientIp)) {
    return NextResponse.json({ message: "Too many requests. Please try again in a few minutes." }, { status: 429 });
  }

  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const result = validate(payload);

  if (!result.valid) {
    return NextResponse.json({ message: result.message }, { status: 400 });
  }

  const emailResult = await sendResendEmail(result.data);

  if (!emailResult.ok) {
    return NextResponse.json({ message: emailResult.message }, { status: 500 });
  }

  return NextResponse.json({ message: "Enquiry sent successfully." }, { status: 200 });
}