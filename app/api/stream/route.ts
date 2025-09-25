import OpenAI from "openai";

export const runtime = "nodejs"; // or "edge" if you prefer

export async function POST(req: Request) {
  const { system, messages } = await req.json();
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const completion = await openai.chat.completions.create({
    model: "gpt-4.1-nano",
    stream: true,
    messages: [
      { role: "system", content: system },
      ...messages,
    ],
  });

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      try {
        for await (const part of completion) {
          // Get exactly what the API returns, which could be an empty string, a space, or text
          const token = part.choices?.[0]?.delta?.content ?? "";
          // Send the token exactly as received - no conditions or filtering
          controller.enqueue(encoder.encode(`data: ${token}\n`));
        }
      } catch (e) {
        controller.enqueue(encoder.encode(`data: [stream-error]\n`));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
