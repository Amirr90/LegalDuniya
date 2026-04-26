import { NextResponse } from "next/server";

const DEFAULT_OLLAMA_BASE = "http://127.0.0.1:11434";

const SYSTEM_PROMPT = `You are LexBridge's website assistant. LexBridge connects people in India with verified lawyers for confidential consults (chat/call). You may explain how the site works, what services are offered at a high level, and how to use Contact or navigation. Never provide legal advice, case strategy, or interpretations of law. If asked for legal advice, refuse briefly and direct the user to the Contact page to speak with a qualified advocate. Keep replies under 140 words. Plain text only, no markdown headings.`;

type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

const MAX_MESSAGES = 20;
const MAX_CONTENT_LEN = 4000;

const CHAT_RATE_LIMIT = 20;
const CHAT_WINDOW_MS = 15 * 60 * 1000;
const chatBuckets = new Map<string, number[]>();

function clientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  return req.headers.get("x-real-ip")?.trim() || "unknown";
}

function allowChatRequest(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - CHAT_WINDOW_MS;
  const prev = chatBuckets.get(ip)?.filter((t) => t > windowStart) ?? [];
  if (prev.length >= CHAT_RATE_LIMIT) return false;
  prev.push(now);
  chatBuckets.set(ip, prev);
  return true;
}

export async function POST(req: Request) {
  const model = process.env.OLLAMA_MODEL?.trim();
  if (!model) {
    return NextResponse.json(
      { error: "AI assistant is not configured on this server." },
      { status: 503 },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (
    !body ||
    typeof body !== "object" ||
    !("messages" in body) ||
    !Array.isArray((body as { messages: unknown }).messages)
  ) {
    return NextResponse.json(
      { error: "Expected a JSON object with a messages array." },
      { status: 400 },
    );
  }

  const raw = (body as { messages: unknown[] }).messages;
  if (raw.length > MAX_MESSAGES) {
    return NextResponse.json(
      { error: `At most ${MAX_MESSAGES} messages allowed.` },
      { status: 400 },
    );
  }

  const messages: ChatMessage[] = [];
  for (const m of raw) {
    if (!m || typeof m !== "object") {
      return NextResponse.json({ error: "Invalid message entry." }, { status: 400 });
    }
    const role = (m as { role?: unknown }).role;
    const content = (m as { content?: unknown }).content;
    if (role !== "user" && role !== "assistant") {
      return NextResponse.json(
        { error: "Each message must have role user or assistant." },
        { status: 400 },
      );
    }
    if (typeof content !== "string" || !content.trim()) {
      return NextResponse.json(
        { error: "Each message must have non-empty string content." },
        { status: 400 },
      );
    }
    if (content.length > MAX_CONTENT_LEN) {
      return NextResponse.json({ error: "Message too long." }, { status: 400 });
    }
    messages.push({ role, content: content.trim() });
  }

  const ip = clientIp(req);
  if (!allowChatRequest(ip)) {
    return NextResponse.json(
      { error: "Too many requests from this network. Please try again later." },
      { status: 429 },
    );
  }

  const base = process.env.OLLAMA_BASE_URL?.trim() || DEFAULT_OLLAMA_BASE;
  const ollamaMessages: ChatMessage[] = [
    { role: "system", content: SYSTEM_PROMPT },
    ...messages,
  ];

  try {
    const res = await fetch(`${base.replace(/\/$/, "")}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        messages: ollamaMessages,
        stream: false,
      }),
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return NextResponse.json(
        {
          error: "The AI service returned an error.",
          detail: text.slice(0, 200),
        },
        { status: 502 },
      );
    }

    const data = (await res.json()) as {
      message?: { role?: string; content?: string };
    };
    const reply = data.message?.content?.trim();
    if (!reply) {
      return NextResponse.json(
        { error: "Empty response from AI service." },
        { status: 502 },
      );
    }

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json(
      { error: "Could not reach the AI service. Is Ollama running?" },
      { status: 503 },
    );
  }
}
