import { ChatMsg, ChatbotConfig } from "@/lib/types/book";

// API helper functions for LLM integration

// Call the LLM API
export async function callLLM(systemPrompt: string, convo: ChatMsg[]): Promise<string> {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ system: systemPrompt, messages: convo }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const text = data.reply || data.message || data.text;
    if (typeof text === "string" && text.trim()) return text.trim();
    throw new Error("Unexpected response shape");
  } catch (err) {
    const lastUser = [...convo].reverse().find((m) => m.role === "user")?.content ?? "";
    return lastUser ? `Thanks! On ${lastUser.slice(0, 60)}… what evidence in the text supports that?` : "What part of the chapter felt most important to you?";
  }
}

// Call the LLM API with streaming
export async function callLLMStream(systemPrompt: string, convo: ChatMsg[], onToken: (t: string) => void): Promise<void> {
  try {
    // Request a streaming response from the API
    const res = await fetch("/api/stream", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ system: systemPrompt, messages: convo, stream: true }),
    });
    
    if (!res.ok || !res.body) throw new Error(`HTTP ${res.status}`);
    
    // Set up the stream reader
    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    
    // Read and process chunks
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      
      const chunk = decoder.decode(value, { stream: true });
      
      // Process each line from the server-sent events
      for (const line of chunk.split('\n')) {
        if (line.startsWith('data: ')) {
          // Extract content after 'data: ' and validate it
          const content = line.slice(6);
          // Only call onToken if we have actual content
          if (content && content.trim().length > 0) {
            onToken(content);
          }
        }
      }
    }
  } catch (e) {
    console.error("Streaming error:", e);
    // Fall back to non-streaming reply
    const reply = await callLLM(systemPrompt, convo);
    onToken(reply);
  }
}

// Build the system prompt for the chatbot
export function buildSystemPrompt(config: ChatbotConfig, chapterTitle: string): string {
  if (config.systemPrompt && config.systemPrompt.trim()) return config.systemPrompt.trim();
  const persona = config.persona || "You are a friendly literature guide: warm, concise, Socratic.";
  const instruction = config.instruction || `Discuss ${chapterTitle}. Ask short, open questions and encourage evidence from the text.`;
  return [
    persona,
    `Instructions: ${instruction}`,
    "Style: concise, upbeat, and curious. Always end with a question to invite the reader to respond.",
  ].join("\n");
}
