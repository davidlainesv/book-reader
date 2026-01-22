"use client";

import React from "react";

interface AudioPageProps {
  url: string;
  htmlContent: string;
  fontSize: number;
  fontFamily: "serif" | "sans" | "mono";
}

export default function AudioPage({
  url,
  htmlContent,
  fontSize,
  fontFamily,
}: AudioPageProps) {
  const controlClass = `custom-font-size custom-line-height`;
  return (
    <div className="h-full w-full flex flex-col bg-gradient-to-b from-purple-50/50 to-violet-50/50 dark:from-purple-950/20 dark:to-violet-950/20 rounded-lg font-sans">
      {/* Audio Header */}
      <div className="px-4 py-3 pt-1.5 border-b border-purple-200/50 dark:border-purple-800/50 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-t-lg">
        <h1
          className={`text-2xl font-bold text-purple-900 dark:text-purple-100 ${controlClass}`}
          style={{ fontSize: `${Math.max(fontSize * 1.3, 24)}px` }}
        >
          Entrevista
        </h1>
        <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">
          Puedes leer la transcripción de la entrevista
        </p>
      </div>

      <div className="px-4 pt-2">
        <div className="pt-1.5">
          <audio controls src={url} className="w-full">
            Tu navegador no soporta el elemento de audio.
          </audio>
        </div>
      </div>

      {/* Audio Transcript/Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div
          className="prose prose-lg dark:prose-invert max-w-none p-6 reading-text"
          style={{
            fontSize: `${fontSize}px`,
            lineHeight: 1.8,
            fontFamily:
              fontFamily === "serif"
                ? "Georgia, serif"
                : fontFamily === "sans"
                  ? "system-ui, sans-serif"
                  : "monospace",
          }}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </div>
  );
}
