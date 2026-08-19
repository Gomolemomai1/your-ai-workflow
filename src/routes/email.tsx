import { createFileRoute } from "@tanstack/react-router";

import { AiTool } from "@/components/app/ai-tool";
import { AppShell } from "@/components/app/app-shell";

export const Route = createFileRoute("/email")({
  head: () => ({
    meta: [
      { title: "Smart Email Generator — Workplace AI" },
      {
        name: "description",
        content:
          "Generate professional workplace emails with the right tone, structure and call to action in seconds.",
      },
      { property: "og:title", content: "Smart Email Generator — Workplace AI" },
      {
        property: "og:description",
        content: "Draft clear, on-tone business emails with AI and edit them before sending.",
      },
    ],
  }),
  component: EmailPage,
});

function EmailPage() {
  return (
    <AppShell
      title="Smart Email Generator"
      subtitle="Turn a few bullet points into a polished, on-tone email"
    >
      <AiTool
        system="You are an expert business communication writer. Write emails that are clear, courteous and outcome-focused. Always output a subject line, then the email body, then a short list of suggested follow-up actions."
        fields={[
          {
            name: "recipient",
            label: "Recipient & relationship",
            type: "input",
            placeholder: "e.g. Priya, client stakeholder",
            required: true,
          },
          {
            name: "purpose",
            label: "Purpose & key points",
            type: "textarea",
            rows: 6,
            placeholder: "Delay on the Q3 report, new delivery date 12 Sep, ask for approval",
            required: true,
          },
          {
            name: "tone",
            label: "Tone",
            type: "select",
            defaultValue: "Professional",
            options: ["Professional", "Friendly", "Direct", "Apologetic", "Persuasive", "Formal"],
          },
          {
            name: "length",
            label: "Length",
            type: "select",
            defaultValue: "Short",
            options: ["Very short", "Short", "Medium", "Detailed"],
          },
        ]}
        buildPrompt={(v) =>
          [
            "Write a workplace email.",
            `Recipient: ${v.recipient}`,
            `Tone: ${v.tone || "Professional"}`,
            `Length: ${v.length || "Short"}`,
            `Purpose and key points:\n${v.purpose}`,
            "Format the response as:\nSubject: <subject>\n\n<email body>\n\nSuggested follow-ups:\n- ...",
          ].join("\n\n")
        }
        submitLabel="Generate email"
        outputLabel="Email draft"
        emptyState="Your generated email will appear here, ready to edit."
      />
    </AppShell>
  );
}