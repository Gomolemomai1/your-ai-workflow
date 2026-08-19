export type AiMessage = { role: "user" | "assistant"; content: string };

export async function streamAi(
  params: { system?: string; messages: AiMessage[] },
  onDelta: (chunk: string) => void,
): Promise<string> {
  const res = await fetch("/api/ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  if (!res.ok || !res.body) {
    const message = await res.text().catch(() => "");
    throw new Error(message || "The assistant could not complete this request.");
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let full = "";
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    const chunk = decoder.decode(value, { stream: true });
    full += chunk;
    onDelta(chunk);
  }
  return full;
}