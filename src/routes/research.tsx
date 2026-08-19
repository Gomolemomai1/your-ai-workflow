import { createFileRoute } from "@tanstack/react-router";

import { AiTool } from "@/components/app/ai-tool";
import { AppShell } from "@/components/app/app-shell";

export const Route = createFileRoute("/research")({
  head: () => ({
    meta: [
      { title: "AI Research Assistant — Workplace AI" },
      {
        name: "description",
        content:
          "Get structured research briefings with key findings, comparisons, risks and recommended next steps.",
      },
      { property: "og:title", content: "AI Research Assistant — Workplace AI" },
      {
        property: "og:description",
        content: "Structured, decision-ready research briefings on any workplace topic.",
      },
    ],
  }),
  component: ResearchPage,
});

function ResearchPage() {
  return (
    <AppShell
      title="AI Research Assistant"
      subtitle="Decision-ready briefings, with uncertainty made explicit"
    >
      <AiTool
        system="You are a rigorous research analyst. Separate well-established facts from uncertain claims, state your confidence, and never fabricate statistics, citations or sources. Recommend where the reader should verify independently."
        fields={[
          {
            name: "topic",
            label: "Research question or topic",
            type: "textarea",
            rows: 4,
            placeholder: "How are mid-size firms adopting AI note-taking tools?",
            required: true,
          },
          {
            name: "depth",
            label: "Depth",
            type: "select",
            defaultValue: "Executive brief",
            options: ["Quick overview", "Executive brief", "Deep dive"],
          },
          {
            name: "angle",
            label: "Focus angle",
            type: "input",
            placeholder: "e.g. cost, compliance risk, competitor landscape",
          },
          {
            name: "audience",
            label: "Audience",
            type: "input",
            placeholder: "e.g. non-technical executives",
          },
        ]}
        buildPrompt={(v) =>
          [
            `Research topic: ${v["topic"]}`,
            `Depth: ${v["depth"] || "Executive brief"}`,
            `Focus angle: ${v["angle"] || "balanced overview"}`,
            `Audience: ${v["audience"] || "business professionals"}`,
            "Return: Executive summary, Key findings (with confidence: high/medium/low), Different perspectives, Risks & caveats, Recommended next steps, What to verify independently.",
          ].join("\n\n")
        }
        submitLabel="Run research brief"
        outputLabel="Research brief"
        emptyState="Your research briefing will appear here."
      />
    </AppShell>
  );
}