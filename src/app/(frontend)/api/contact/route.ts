import { NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z
  .object({
    name: z.string().trim().min(1).max(200),
    email: z.string().trim().email().max(320),
    message: z.string().trim().min(1).max(8000),
    topic: z.string().trim().max(200).optional(),
    mobile: z.string().trim().max(40).optional(),
    service: z.string().trim().max(200).optional(),
    company: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.company?.trim()) {
      ctx.addIssue({ code: "custom", message: "Honeypot triggered", path: ["company"] });
    }
  });

function buildEmailText(parsed: z.infer<typeof bodySchema>): string {
  const lines = [
    parsed.message,
    "",
    `From: ${parsed.name}`,
    `Email: ${parsed.email}`,
  ];
  if (parsed.mobile) lines.push(`Mobile: ${parsed.mobile}`);
  if (parsed.topic) lines.push(`Topic: ${parsed.topic}`);
  if (parsed.service) lines.push(`Service: ${parsed.service}`);
  return lines.join("\n");
}

export async function POST(req: Request) {
  let jsonBody: unknown;
  try {
    jsonBody = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(jsonBody);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", details: parsed.error.flatten() },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.RESEND_FROM_EMAIL?.trim();
  const to = process.env.RESEND_TO_EMAIL?.trim();

  if (!apiKey || !from || !to) {
    return NextResponse.json({ ok: true, mode: "client-mailto" as const });
  }

  const subjectParts = ["LexBridge inquiry", data.name];
  if (data.service) subjectParts.push(`— ${data.service}`);
  const subject = subjectParts.join(" ");
  const text = buildEmailText(data);

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        text,
        reply_to: data.email,
      }),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      return NextResponse.json(
        { ok: true, mode: "client-mailto" as const, detail: errText.slice(0, 120) },
        { status: 200 },
      );
    }

    return NextResponse.json({ ok: true, mode: "sent" as const });
  } catch {
    return NextResponse.json({ ok: true, mode: "client-mailto" as const }, { status: 200 });
  }
}
