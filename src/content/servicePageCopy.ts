type TemplateInput = {
  labelLower: string;
  focus: string;
};

type ComplianceTemplateInput = {
  topic: string;
};

export const servicePageCopy = {
  heroSummary: ({ labelLower, focus }: TemplateInput) =>
    `LexBridge helps you speak with advocates who regularly work on ${labelLower} files. Whether you need a quick consult or end-to-end representation, share your facts and we will align you with counsel experienced in ${focus}.`,
  articleLead: ({ labelLower }: TemplateInput) =>
    `Choosing the right advocate for ${labelLower} matters can save time, cost, and stress. The overview below explains how LexBridge approaches these cases at a high level. It is general information only—not legal advice for your specific situation.`,
  sectionBodies: {
    specializedKnowledge: ({ labelLower }: TemplateInput) =>
      `Advocates on LexBridge who focus on ${labelLower} stay current on procedural rules, evidentiary issues, and forum-specific practice. They can help you understand timelines, documents, and realistic outcomes before you commit to a strategy.`,
    personalizedApproach: ({ labelLower }: TemplateInput) =>
      `No two matters are identical. Counsel can tailor advice to your priorities—whether that is speed, settlement, preserving relationships, or preparing for contested hearings related to ${labelLower}.`,
    litigationSupport: () =>
      "If court or tribunal proceedings are necessary, LexBridge-connected advocates can help with drafting, filings, briefing, and hearing representation—always subject to your instructions and engagement terms.",
    techUpdates: ({ labelLower }: TemplateInput) =>
      `LexBridge is built for fast, confidential intake and follow-ups. You can request a callback or written next steps so you are not navigating ${labelLower} questions alone.`,
  },
  metaDescription: ({ labelLower }: TemplateInput, label: string) =>
    `${label} — connect with LexBridge for a confidential consult. General information about how our network approaches ${labelLower} matters. Not legal advice.`,
} as const;

export const complianceServicePageCopy = {
  heroSummary: ({ topic }: ComplianceTemplateInput) =>
    `LexBridge helps you coordinate ${topic} with professionals used to government portals, timelines, and document checklists. Share your situation once and we will align you with the right specialist for filings, replies, and follow-ups.`,
  articleLead: ({ topic }: ComplianceTemplateInput) =>
    `Getting ${topic} right early reduces rework, rejections, and penalties. The overview below is general information about how LexBridge supports incorporation, tax, and IP filings—not legal, tax, or regulatory advice for your specific facts.`,
  sectionBodies: {
    clearScope: ({ topic }: ComplianceTemplateInput) =>
      `You should know what documents are needed, what approvals apply, and what “done” looks like. LexBridge-connected company secretaries, chartered accountants, and advocates can explain the steps for ${topic} in plain language before work begins.`,
    filingsAndResponses: ({ topic }: ComplianceTemplateInput) =>
      `Many ${topic} matters depend on correct forms, class selections, and supporting evidence. Specialists can help you prepare submissions, track objections or queries, and respond within deadlines.`,
    coordinationAcrossDisciplines: () =>
      "Registrations and compliance often touch more than one domain—for example, corporate changes alongside tax positions. LexBridge can help you sequence work so related filings stay consistent.",
    ongoingAwareness: ({ topic }: ComplianceTemplateInput) =>
      `After the first milestone, calendars matter: renewals, event-based filings, and annual obligations. Ask about reminders and review cycles so ${topic} does not become a last-minute scramble.`,
    intakeAndFollowup: ({ topic }: ComplianceTemplateInput) =>
      `LexBridge is built for confidential intake and status updates. Request a callback or written next steps so you are not navigating ${topic} requirements alone.`,
  },
  metaDescription: (label: string) =>
    `${label} — LexBridge intake for registrations, compliance, and IP filings. General information only; not legal or tax advice.`,
} as const;
