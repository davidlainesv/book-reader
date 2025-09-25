import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req: Request) {
  const { system, messages } = await req.json();
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: system },
      ...messages, // [{role, content}]
    ],
  });

  const reply = completion.choices[0]?.message?.content ?? "";
  return NextResponse.json({ reply });
}
