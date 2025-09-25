'use client';

import React, { useEffect, useRef, useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatMsg, ChatbotConfig } from "@/lib/types/book";
import { buildSystemPrompt, callLLMStream } from "@/lib/api/chat";

interface ChatbotPanelProps {
  chapterIdx: number;
  chapterTitle: string;
  config: ChatbotConfig;
  messages: ChatMsg[];
  setMessages: React.Dispatch<React.SetStateAction<ChatMsg[]>>;
  fontSize: number;
}

export default function ChatbotPanel({
  chapterIdx,
  chapterTitle,
  config,
  messages,
  setMessages,
  fontSize,
}: ChatbotPanelProps) {
  const [input, setInput] = useState("");
  const [isGeneratingResponse, setIsGeneratingResponse] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    // Only initialize with a message if we have a valid setMessages function
    if ((!messages || messages.length === 0) && setMessages) {
      try {
        setMessages([{ role: "assistant", content: "¿Qué te llamó más la atención en este capítulo?" }]);
      } catch (err) {
        console.error("Error initializing chat messages:", err);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update the font size for chatbot content
  useEffect(() => {
    document.documentElement.style.setProperty('--reader-font-size', `${fontSize}px`);
  }, [fontSize]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: 999999, behavior: "smooth" });
  }, [messages]);

  // Auto-resize textarea based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 120) + 'px';
    }
  }, [input]);

  const onSend = async () => {
    const text = input.trim();
    if (!text || isGeneratingResponse) return;
    setIsGeneratingResponse(true);
    const systemPrompt = buildSystemPrompt(config, chapterTitle);

    // add user message
    setMessages((prev) => [...prev, { role: "user", content: text }]);
    setInput("");

    // create empty assistant message for streaming
    let assistantIndex = -1;
    setMessages((prev) => {
      assistantIndex = prev.length;
      return [...prev, { role: "assistant", content: "" }];
    });

    const convo: ChatMsg[] = [{ role: "assistant", content: systemPrompt }, ...messages, { role: "user", content: text }];

    const appendToken = (tok: string) => {
      if (tok.trim().length === 0) return; // Skip empty tokens
      setIsGeneratingResponse((prev) => {
        return prev ? false : prev;
      });
      setMessages((prev) => {
        const copy = [...prev];
        const last = copy[assistantIndex] || { role: "assistant", content: "" };
        // Directly append token without any additional processing
        copy[assistantIndex] = { role: "assistant", content: (last.content || "") + tok };
        return copy;
      });
    };

    await callLLMStream(systemPrompt, convo, appendToken);
  };

  return (
    <div className="h-full w-full flex flex-col">
      <div ref={listRef} className="flex-1 h-0 overflow-auto space-y-2 rounded-lg">
        {messages.map((m, idx) => (
          <div
            hidden={m.content.trim().length === 0}
            key={idx}
            className={`max-w-[80%] rounded-lg px-3 py-2 custom-font-size custom-line-height ${m.role === "assistant" ? "bg-muted" : "bg-primary text-primary-foreground ml-auto"
              }`}
          >
            {m.content}
          </div>
        ))}
        {isGeneratingResponse && (
          <div className="max-w-[80%] rounded-lg px-3 py-2 bg-muted custom-font-size custom-line-height">
            <div className="flex items-center gap-1">
              <span className="text-sm opacity-70">Pensando</span>
              <div className="flex gap-1 ml-2">
                <div className="w-2 h-2 bg-current rounded-full animate-bounce opacity-60 [animation-delay:0ms]"></div>
                <div className="w-2 h-2 bg-current rounded-full animate-bounce opacity-60 [animation-delay:150ms]"></div>
                <div className="w-2 h-2 bg-current rounded-full animate-bounce opacity-60 [animation-delay:300ms]"></div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="mt-2 rounded-2xl border p-3">
        <textarea
          ref={textareaRef}
          className="w-full bg-transparent resize-none min-h-[32px] max-h-[100px] overflow-auto focus:outline-none placeholder:text-muted-foreground"
          placeholder="Ask or reflect about this chapter..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSend();
            }
          }}
          disabled={isGeneratingResponse}
          rows={2}
        />
        <div className="flex justify-end pt-2">
          <Button 
            onClick={onSend} 
            size="icon" 
            aria-label="Send" 
            disabled={isGeneratingResponse}
            className="h-8 w-8 rounded-full"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
