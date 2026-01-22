"use client";

import React, { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatMsg, ChatbotConfig } from "@/lib/types/book";
import { buildSystemPrompt, callLLMStream } from "@/lib/api/chat";

interface ChatbotPageProps {
  title: string;
  config: ChatbotConfig;
  messages: ChatMsg[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMsg[]>>;
  fontSize: number;
}

export default function ChatbotPage({
  title,
  config,
  messages,
  setMessages,
  fontSize,
}: ChatbotPageProps) {
  const [input, setInput] = useState("");
  const [isGeneratingResponse, setIsGeneratingResponse] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    // Only initialize with a message if we have a valid setMessages function
    if ((!messages || messages.length === 0) && setMessages) {
      try {
        setMessages([
          {
            role: "assistant",
            content: "¿Qué te llamó más la atención en este capítulo?",
          },
        ]);
      } catch (err) {
        console.error("Error initializing chat messages:", err);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update the font size for chatbot content
  useEffect(() => {
    document.documentElement.style.setProperty(
      "--reader-font-size",
      `${fontSize}px`,
    );
  }, [fontSize]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: 999999, behavior: "smooth" });
  }, [messages]);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 120) + "px";
    }
  }, [input]);

  const onSend = async () => {
    const text = input.trim();
    if (!text || isGeneratingResponse) return;
    setIsGeneratingResponse(true);
    const systemPrompt = buildSystemPrompt(config, title);

    // add user message
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");

    // create empty assistant message for streaming
    let assistantIndex = -1;
    setMessages((prev) => {
      assistantIndex = prev.length;
      return [...prev, { role: "assistant", content: "" }];
    });

    const convo: ChatMsg[] = [
      { role: "assistant", content: systemPrompt },
      ...messages,
      { role: "user", content: text },
    ];

    const appendToken = (tok: string) => {
      if (tok.trim().length === 0) return; // Skip empty tokens
      setIsGeneratingResponse((prev) => {
        return prev ? false : prev;
      });
      setMessages((prev) => {
        const copy = [...prev];
        const last = copy[assistantIndex] || { role: "assistant", content: "" };
        // Directly append token without any additional processing
        copy[assistantIndex] = {
          role: "assistant",
          content: (last.content || "") + tok,
        };
        return copy;
      });
    };

    await callLLMStream(systemPrompt, convo, appendToken);
  };

  const controlClass = `custom-font-size custom-line-height`;

  return (
    <div className="h-full w-full flex flex-col bg-gradient-to-b from-indigo-50/50 to-violet-50/50 dark:from-indigo-950/20 dark:to-violet-950/20 rounded-lg font-sans">
      {/* Chat Header */}
      <div className="px-4 py-3 pt-1.5 border-b border-indigo-200/50 dark:border-indigo-800/50 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-t-lg">
        <h1
          className={`text-2xl font-bold text-indigo-900 dark:text-indigo-100 ${controlClass}`}
          style={{ fontSize: `${Math.max(fontSize * 1.3, 24)}px` }}
        >
          {title}
        </h1>
        <p className="text-sm text-indigo-700 dark:text-indigo-300 mt-1">
          Reflexiona sobre lo que has Aprendido Creando Conciencia
        </p>
      </div>

      {/* Messages Area */}
      <div ref={listRef} className="flex-1 h-0 overflow-auto space-y-3 p-4">
        {messages.map((m, idx) => (
          <div
            hidden={m.content.trim().length === 0}
            key={idx}
            className={`max-w-[85%] rounded-2xl px-4 py-3 text-base shadow-sm ${
              m.role === "assistant"
                ? "bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200/50 dark:border-gray-700/50"
                : "bg-indigo-500 text-white ml-auto shadow-md"
            }`}
          >
            <div className="leading-relaxed">{m.content}</div>
          </div>
        ))}
        {isGeneratingResponse && (
          <div className="max-w-[85%] rounded-2xl px-4 py-3 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200/50 dark:border-gray-700/50 shadow-sm custom-font-size custom-line-height">
            <div className="flex items-center gap-2">
              <span className="text-sm opacity-70">Generando respuesta</span>
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce opacity-60 [animation-delay:0ms]"></div>
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce opacity-60 [animation-delay:150ms]"></div>
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce opacity-60 [animation-delay:300ms]"></div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-indigo-200/50 dark:border-indigo-800/50 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-b-lg">
        <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden relative">
          <div className="flex items-end gap-2 p-3">
            <textarea
              ref={textareaRef}
              className="flex-1 bg-transparent resize-none min-h-[24px] max-h-[120px] overflow-hidden focus:outline-none placeholder:text-muted-foreground text-base leading-6"
              placeholder="Comparte tus pensamientos sobre este capítulo..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  onSend();
                }
              }}
              disabled={isGeneratingResponse}
              rows={1}
              style={{ height: "auto", fontSize: "16px" }}
            />
            <Button
              onClick={onSend}
              size="icon"
              aria-label="Send message"
              disabled={isGeneratingResponse || !input.trim()}
              className="h-8 w-8 rounded-full bg-indigo-500 hover:bg-indigo-600 text-white disabled:opacity-50 flex-shrink-0 self-end"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
