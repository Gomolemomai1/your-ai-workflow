import { createFileRoute } from "@tanstack/react-router";

import { AiTool } from "@/components/app/ai-tool";
import { AppShell } from "@/components/app/app-shell";

export const Route = createFileRoute("/notes")({
  head: () => ({
    meta: [
      { title: "Meeting Notes Summarizer — Workplace AI" },
      {
        name: "description",
        content:
          "Convert messy meeting notes or transcripts into decisions, action items with owners, and open questions.",
      },
      { property: "og:title", content: "Meeting Notes Summarizer — Workplace AI" },
      {
        property: "og:description",
        content: "Summarise meetings into decisions, owners and next steps automatically.",
      },
    ],
  }),
  component: NotesPage,
});

function NotesPage() {
  return (
    <AppShell
      title="Meeting Notes Summarizer"
      subtitle="Decisions, action items and owners extracted from raw notes"
    >
      <AiTool
        system="You are a meticulous meeting analyst. Extract only what is supported by the notes, never invent decisions or owners. If information is missing, list it under Open questions."
        fields={[
          {
            name: "notes",
            label: "Raw notes or transcript",
            type: "textarea",
            rows: 12,
            placeholder: "Paste your meeting notes or transcript here…",
            required: true,
          },
          {
            name: "meeting",
            label: "Meeting type",
            type: "select",
            defaultValue: "Team stand-up",
            options: [
              "Team stand-up",
              "Client meeting",
              "Project review",
              "Strategy session",
              "1:1",
              "Interview",
            ],
          },
          {
            name: "audience",
            label: "Summary audience",
            type: "input",
            placeholder: "e.g. leadership team",
          },
        ]}
        buildPrompt={(v) =>
          [
            `Summarise the following ${v["meeting"] || "meeting"} notes${v["audience"] ? ` for: ${v["audience"]}` : ""}.`,
            "Return these sections with markdown headings: Summary (3 bullets), Key decisions, Action items (table-style lines of `Owner — task — due date`), Risks & blockers, Open questions.",
            `Notes:\n${v["notes"]}`,
          ].join("\n\n")
        }
        submitLabel="Summarize notes"
        outputLabel="Meeting summary"
        emptyState="Your structured meeting summary will appear here."
      />
    </AppShell>
  );
}