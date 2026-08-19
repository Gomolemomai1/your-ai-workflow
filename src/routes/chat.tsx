import { createFileRoute } from "@tanstack/react-router";
import { Loader2, Send, Sparkles, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { AppShell } from "@/components/app/app-shell";
import { ResponsibleAiNotice } from "@/components/app/responsible-ai-notice";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { streamAi, type AiMessage } from "@/lib/ai-client";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Assistant Chat — Workplace AI" },
      {
        name: "description",
        content:
          "Chat with an AI workplace assistant that keeps context across the conversation to help with everyday work tasks.",
      },
      { property: "og:title", content: "AI Assistant Chat — Workplace AI" },
      {
        property: "og:description",
        content: "A context-aware AI chat assistant for everyday workplace questions.",
      },
    ],
  }),
  component: ChatPage,
});

const SYSTEM =
  "You are a workplace productivity assistant. Give concise, practical, professional answers. Use short paragraphs and bullet points. Ask a clarifying question when the request is ambiguous, and be transparent when you are unsure.";

const SUGGESTIONS = [
  "Help me say no to a meeting politely",
  "Draft an agenda for a 30-minute project kickoff",
  "Rewrite this update to be more confident",
  "What should I prioritise this week?",
];

function ChatPage() {
  const [messages, setMessages] = useState<AiMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || loading) return;
    const next: AiMessage[] = [...messages, { role: "user", content }];
    setMessages([...next, { role: "assistant", content: "" }]);
    setInput("");
    setLoading(true);
    try {
      await streamAi({ system: SYSTEM, messages: next }, (delta) => {
        setMessages((prev) => {
          const copy = [...prev];
          const last = copy[copy.length - 1];
          if (last && last.role === "assistant") {
            copy[copy.length - 1] = { role: "assistant", content: last.content + delta };
          }
          return copy;
        });
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "The assistant is unavailable");
      setMessages(next);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AppShell title="AI Assistant Chat" subtitle="Context-aware help for everyday work questions">
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_18rem]">
        <section className="panel flex h-[70vh] min-h-[32rem] flex-col p-4 md:p-6">
          <div className="flex-1 space-y-4 overflow-y-auto pr-1">
            {messages.length === 0 && (
              <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                <span
                  className="flex size-12 items-center justify-center rounded-2xl"
                  style={{ backgroundImage: "var(--gradient-primary)" }}
                >
                  <Sparkles className="size-6 text-primary-foreground" />
                </span>
                <p className="max-w-sm text-sm text-muted-foreground">
                  Ask anything about your work — drafting, planning, summarising or thinking
                  through a decision.
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="rounded-full border border-border bg-secondary/50 px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-foreground"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                className={
                  message.role === "user" ? "flex justify-end gap-3" : "flex justify-start gap-3"
                }
              >
                {message.role === "assistant" && (
                  <span className="mt-1 flex size-7 shrink-0 items-center justify-center rounded-lg bg-secondary">
                    <Sparkles className="size-3.5 text-primary" />
                  </span>
                )}
                <div
                  className={
                    message.role === "user"
                      ? "max-w-[80%] rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground"
                      : "max-w-[85%] whitespace-pre-wrap rounded-2xl rounded-bl-sm bg-secondary/60 px-4 py-2.5 text-sm leading-relaxed"
                  }
                >
                  {message.content ||
                    (loading ? <Loader2 className="size-4 animate-spin" /> : null)}
                </div>
                {message.role === "user" && (
                  <span className="mt-1 flex size-7 shrink-0 items-center justify-center rounded-lg bg-secondary">
                    <User className="size-3.5" />
                  </span>
                )}
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              void send(input);
            }}
            className="mt-4 flex items-end gap-2 border-t border-border pt-4"
          >
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void send(input);
                }
              }}
              rows={2}
              placeholder="Ask your assistant… (Enter to send, Shift+Enter for a new line)"
              className="min-h-[3rem] resize-none bg-background/40"
            />
            <Button type="submit" size="lg" disabled={loading || !input.trim()}>
              {loading ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
            </Button>
          </form>
        </section>

        <aside className="space-y-4">
          <div className="panel p-5 text-sm">
            <h2 className="font-display text-sm font-semibold">Conversation tips</h2>
            <ul className="mt-3 space-y-2 text-xs text-muted-foreground">
              <li>• Give context: role, audience and desired outcome.</li>
              <li>• Ask for a format: bullets, table, email, checklist.</li>
              <li>• Iterate — say what to change instead of restarting.</li>
            </ul>
          </div>
          <ResponsibleAiNotice />
        </aside>
      </div>
    </AppShell>
  );
}