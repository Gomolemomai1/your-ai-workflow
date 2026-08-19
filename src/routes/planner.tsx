import { createFileRoute } from "@tanstack/react-router";

import { AiTool } from "@/components/app/ai-tool";
import { AppShell } from "@/components/app/app-shell";

export const Route = createFileRoute("/planner")({
  head: () => ({
    meta: [
      { title: "AI Task Planner — Workplace AI" },
      {
        name: "description",
        content:
          "Break goals into a prioritised, time-boxed task plan with dependencies, owners and effort estimates.",
      },
      { property: "og:title", content: "AI Task Planner — Workplace AI" },
      {
        property: "og:description",
        content: "Turn a goal and a deadline into a realistic, prioritised execution plan.",
      },
    ],
  }),
  component: PlannerPage,
});

function PlannerPage() {
  return (
    <AppShell
      title="AI Task Planner"
      subtitle="From a fuzzy goal to a prioritised, time-boxed plan"
    >
      <AiTool
        system="You are a pragmatic project planner. Produce realistic, sequenced plans with effort estimates, dependencies and clear priorities. Flag assumptions explicitly."
        fields={[
          {
            name: "goal",
            label: "Goal or project",
            type: "textarea",
            rows: 4,
            placeholder: "Launch the internal onboarding portal",
            required: true,
          },
          {
            name: "deadline",
            label: "Deadline / timeframe",
            type: "input",
            placeholder: "e.g. 6 weeks, by 30 November",
          },
          {
            name: "capacity",
            label: "Team & capacity",
            type: "input",
            placeholder: "e.g. 2 developers, 1 designer, 10h/week each",
          },
          {
            name: "framework",
            label: "Prioritisation framework",
            type: "select",
            defaultValue: "MoSCoW",
            options: ["MoSCoW", "Eisenhower matrix", "RICE scoring", "Simple P1–P3"],
          },
          {
            name: "constraints",
            label: "Constraints & context",
            type: "textarea",
            rows: 4,
            placeholder: "Budget limits, dependencies, approvals needed…",
          },
        ]}
        buildPrompt={(v) =>
          [
            `Create an execution plan for this goal:\n${v["goal"]}`,
            `Timeframe: ${v["deadline"] || "not specified"}`,
            `Capacity: ${v["capacity"] || "not specified"}`,
            `Prioritise using: ${v["framework"] || "MoSCoW"}`,
            `Constraints: ${v["constraints"] || "none given"}`,
            "Return: Objective, Milestones with dates, Task breakdown (`Priority — task — owner — estimate — dependency`), Weekly schedule, Risks & mitigations, Assumptions.",
          ].join("\n\n")
        }
        submitLabel="Build task plan"
        outputLabel="Task plan"
        emptyState="Your prioritised task plan will appear here."
      />
    </AppShell>
  );
}