export type ChatbotFaqEntry = {
  question: string;
  answer: string;
  /** Extra phrases to improve matching on free-form input */
  keywords?: string[];
};

/** Shown when no FAQ matches and AI is unavailable or errors—still a full, helpful reply */
export const CHATBOT_FALLBACK_ANSWER =
  "Thanks for writing in. I am a website helper for LexBridge, not a lawyer: I do not answer one-off legal questions or tell you what you should do in your matter—that would be legal advice, and it needs an advocate who knows your full facts and jurisdiction.\n\nWhat I can tell you is how to move forward on LexBridge: use the quick questions below if they fit (how to find a lawyer, confidentiality, coverage, fees in general terms, and so on). For anything specific to your case, open the Contact page, describe your issue, city or state, and how soon you need help. A verified lawyer can then give you confidential guidance by chat or call.\n\nIf you are in immediate danger, contact local emergency services first.";

export const CHATBOT_FAQ: ChatbotFaqEntry[] = [
  {
    question: "My question is not in the list—how do I get an answer?",
    answer:
      "If your question is about your own rights, documents, court steps, or what someone else can do to you, that is legal advice. This assistant cannot answer that. Use the Contact page: explain your situation in a few lines, your location, and any deadlines. LexBridge will connect you with a verified advocate for a confidential consult. For general questions only about how LexBridge works, try the quick questions below.",
    keywords: [
      "not listed",
      "no answer",
      "saved answer",
      "you did not",
      "didn't answer",
      "still need",
      "actual answer",
      "tell me about my",
      "what about my",
    ],
  },
  {
    question: "What is LexBridge?",
    answer:
      "LexBridge connects you with verified legal experts across India. You can get confidential guidance by chat or call on matters like divorce, property, corporate law, criminal defence, and more. For a formal retainer or court representation, a qualified advocate from our network can help.",
    keywords: ["about", "platform", "what do you do", "who are you"],
  },
  {
    question: "How do I talk to a lawyer?",
    answer:
      "Use Find a lawyer on the home page to explore services, or open the Contact page to send your request. Briefly describe your issue and preferred city or practice area so we can route you to the right expert.",
    keywords: [
      "consult",
      "book",
      "speak",
      "call",
      "appointment",
      "hire",
      "talk to someone",
      "speak to someone",
      "connect me",
      "get help",
      "need a lawyer",
    ],
  },
  {
    question: "Is my consultation confidential?",
    answer:
      "Yes. LexBridge is built around confidential consults. What you share with verified experts is handled with professional discretion. This assistant only gives general website information—not legal advice.",
    keywords: ["privacy", "secret", "nda", "disclosure"],
  },
  {
    question: "Which cities or practice areas do you cover?",
    answer:
      "We highlight coverage across 100+ cities and many practice areas—including family, property, corporate, criminal, consumer, and IP. Exact availability depends on the advocate; use Contact with your location for the best match.",
    keywords: ["location", "india", "city", "near me", "areas"],
  },
  {
    question: "How much does it cost?",
    answer:
      "Fees depend on the advocate, complexity, and type of work (consult vs ongoing matter). This site does not quote fixed prices here. Share your situation on the Contact page so a professional can outline typical fee structures.",
    keywords: ["price", "fee", "charges", "payment", "expensive"],
  },
  {
    question: "Can you give legal advice in this chat?",
    answer:
      "No. This assistant only shares general information about LexBridge. Legal advice needs a qualified lawyer who knows your facts and jurisdiction. Use Contact to reach a verified expert.",
    keywords: ["advice", "opinion", "should i sue", "is it legal", "my case"],
  },
  {
    question: "What if I need urgent help?",
    answer:
      "For emergencies involving safety or imminent harm, contact local police or emergency services first. For urgent legal timelines (court dates, notices), mention urgency on the Contact page so your request can be prioritized.",
    keywords: ["urgent", "emergency", "today", "deadline", "notice"],
  },
  {
    question: "How do I report a problem with the site?",
    answer:
      "Use the Contact page and choose a general enquiry, describing what went wrong (page, device, browser). We read all feedback and use it to improve LexBridge.",
    keywords: ["bug", "broken", "error", "feedback"],
  },
];

function normalize(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");
}

const MATCH_THRESHOLD = 22;

/** Best FAQ entry for free-form user text, or null if no confident match */
export function matchChatbotFaq(userText: string): ChatbotFaqEntry | null {
  const n = normalize(userText);
  if (!n) return null;

  let best: ChatbotFaqEntry | null = null;
  let bestScore = 0;

  for (const entry of CHATBOT_FAQ) {
    const q = normalize(entry.question);
    let score = 0;
    if (n === q) score = 100;
    else if (n.includes(q) || q.includes(n)) score = 85;
    else {
      for (const kw of entry.keywords ?? []) {
        const k = kw.toLowerCase();
        if (k && n.includes(k)) score += 22;
      }
      const userWords = new Set(
        n.split(/\W+/).filter((w) => w.length > 2),
      );
      for (const w of q.split(/\W+/).filter((x) => x.length > 2)) {
        if (userWords.has(w)) score += 6;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }

  return bestScore >= MATCH_THRESHOLD ? best : null;
}
