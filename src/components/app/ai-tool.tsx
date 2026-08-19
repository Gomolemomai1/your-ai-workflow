import { Check, Copy, Loader2, RotateCcw, Sparkles } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ResponsibleAiNotice } from "./responsible-ai-notice";
import { streamAi } from "@/lib/ai-client";

export type ToolField = {
  name: string;
  label: string;
  placeholder?: string;
  type: "input" | "textarea" | "select";
  options?: string[];
  rows?: number;
  required?: boolean;
  defaultValue?: string;
};

export type AiToolProps = {
  fields: ToolField[];
  system: string;
  buildPrompt: (values: Record<string, string>) => string;
  submitLabel: string;
  outputLabel: string;
  emptyState: string;
};

export function AiTool({
  fields,
  system,
  buildPrompt,
  submitLabel,
  outputLabel,
  emptyState,
}: AiToolProps) {
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(fields.map((f) => [f.name, f.defaultValue ?? ""])),
  );
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const set = (name: string, value: string) => setValues((v) => ({ ...v, [name]: value }));

  async function generate() {
    const missing = fields.find((f) => f.required && !values[f.name]?.trim());
    if (missing) {
      toast.error(`${missing.label} is required`);
      return;
    }
    setLoading(true);
    setOutput("");
    try {
      await streamAi({ system, messages: [{ role: "user", content: buildPrompt(values) }] }, (d) =>
        setOutput((prev) => prev + d),
      );
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  async function copy() {
    await navigator.clipboard.writeText(output);
    setCopied(true);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <section className="panel space-y-5 p-5 md:p-6">
        <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground">
          Structured prompt
        </h2>

        {fields.map((field) => (
          <div key={field.name} className="space-y-2">
            <Label htmlFor={field.name}>
              {field.label}
              {field.required && <span className="ml-1 text-primary">*</span>}
            </Label>
            {field.type === "input" && (
              <Input
                id={field.name}
                placeholder={field.placeholder}
                value={values[field.name] ?? ""}
                onChange={(e) => set(field.name, e.target.value)}
              />
            )}
            {field.type === "textarea" && (
              <Textarea
                id={field.name}
                rows={field.rows ?? 5}
                placeholder={field.placeholder}
                value={values[field.name] ?? ""}
                onChange={(e) => set(field.name, e.target.value)}
              />
            )}
            {field.type === "select" && (
              <Select value={values[field.name] ?? ""} onValueChange={(v) => set(field.name, v)}>
                <SelectTrigger id={field.name}>
                  <SelectValue placeholder={field.placeholder ?? "Select"} />
                </SelectTrigger>
                <SelectContent>
                  {(field.options ?? []).map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>
        ))}

        <Button onClick={generate} disabled={loading} className="w-full" size="lg">
          {loading ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Sparkles className="size-4" aria-hidden />
          )}
          {loading ? "Generating…" : submitLabel}
        </Button>

        <ResponsibleAiNotice />
      </section>

      <section className="panel flex min-h-[28rem] flex-col p-5 md:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-muted-foreground">
            {outputLabel} · editable
          </h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={copy} disabled={!output}>
              {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              Copy
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={generate}
              disabled={loading || !output}
              aria-label="Regenerate"
            >
              <RotateCcw className="size-3.5" />
              Regenerate
            </Button>
          </div>
        </div>

        <Textarea
          value={output}
          onChange={(e) => setOutput(e.target.value)}
          placeholder={emptyState}
          className="min-h-[22rem] flex-1 resize-none bg-background/40 font-mono text-sm leading-relaxed"
        />
        <p className="mt-3 text-xs text-muted-foreground">
          You can edit this draft directly before copying it into your tools.
        </p>
      </section>
    </div>
  );
}