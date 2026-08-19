import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { AppShell } from "@/components/app/app-shell";
import { ResponsibleAiNotice } from "@/components/app/responsible-ai-notice";
import { navItems } from "@/components/app/nav-items";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Workplace Productivity Assistant" },
      {
        name: "description",
        content:
          "Automate workplace tasks with AI: draft emails, summarise meetings, plan work, research topics and chat with an assistant.",
      },
      { property: "og:title", content: "AI Workplace Productivity Assistant" },
      {
        property: "og:description",
        content:
          "One dashboard for AI email drafting, meeting summaries, task planning, research and chat.",
      },
    ],
  }),
  component: Index,
});

const stats = [
  { label: "AI workspaces", value: "5" },
  { label: "Structured prompts", value: "20+" },
  { label: "Outputs", value: "Fully editable" },
  { label: "Human oversight", value: "Always" },
];

function Index() {
  const tools = navItems.filter((item) => item.to !== "/");

  return (
    <AppShell
      title="Dashboard"
      subtitle="Your AI workspace for everyday professional tasks"
    >
      <div className="space-y-8">
        <section className="panel overflow-hidden p-6 md:p-10">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-primary">
            Workplace AI
          </p>
          <h2 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight md:text-5xl">
            Automate the busywork.
            <span className="text-gradient"> Keep the judgement.</span>
          </h2>
          <p className="mt-4 max-w-xl text-sm text-muted-foreground md:text-base">
            Draft emails, summarise meetings, plan projects and research decisions from one
            dashboard — every output structured, streamed and editable before you use it.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/email"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              Start with an email <ArrowRight className="size-4" />
            </Link>
            <Link
              to="/chat"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-secondary"
            >
              Open assistant chat
            </Link>
          </div>

          <dl className="mt-10 grid grid-cols-2 gap-4 border-t border-border pt-6 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt className="text-xs uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </dt>
                <dd className="mt-1 font-display text-lg font-semibold">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section>
          <h2 className="mb-4 font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            Workspaces
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {tools.map((tool) => (
              <Link
                key={tool.to}
                to={tool.to}
                className="panel group flex flex-col gap-3 p-5 transition-all hover:-translate-y-0.5 hover:border-primary/50"
              >
                <span className="flex size-10 items-center justify-center rounded-lg bg-secondary text-primary">
                  <tool.icon className="size-5" aria-hidden />
                </span>
                <span className="font-display text-base font-semibold">{tool.label}</span>
                <span className="text-sm text-muted-foreground">{tool.description}</span>
                <span className="mt-auto inline-flex items-center gap-1.5 pt-2 text-xs font-medium text-primary">
                  Open <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))}
          </div>
        </section>

        <ResponsibleAiNotice />
      </div>
    </AppShell>
  );
}
