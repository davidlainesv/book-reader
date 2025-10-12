'use client';

import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Menu, Send, Minus, Plus, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import ChatbotPanel from "./ChatbotPanel";
import FormPage from "./FormPage";
import { ChatMsg, ChatbotConfig, PageContent } from "@/lib/types/book";
import styles from "./BookReaderApp.module.css";
import "./reading-enhancements.css";
import { sampleBook } from "@/lib/constants/sample-book";

// ======================================================
// Main Component – CSS columns pagination for text
// ======================================================
export default function BookReaderApp() {
  const book = sampleBook;
  const colRef = useRef<HTMLDivElement | null>(null); // horizontal scroll container for columns
  const [colWidthPx, setColWidthPx] = useState<number>(0);
  const [textColIndex, setTextColIndex] = useState(0);
  const [textColCount, setTextColCount] = useState(1);
  const [shouldGoToLastColumn, setShouldGoToLastColumn] = useState(false);

  const [settings, setSettings] = useState({
    fontSize: 18,
    lineHeight: 1.8,
    fontFamily: "serif" as "serif" | "sans" | "mono",
  });

  const [chapterIdx, setChapterIdx] = useState(0);
  const [pageIdx, setPageIdx] = useState(0);
  const [chatMessages, setChatMessages] = useState<ChatMsg[]>([]);
  const [formAnswers, setFormAnswers] = useState<Record<string, any>>({});
  const [showBookInfo, setShowBookInfo] = useState(false);

  const chapter = book.chapters[chapterIdx];
  const page = chapter.pages[pageIdx];

  // --- Tests (lightweight) ---
  useEffect(() => {
    console.assert(sampleBook.chapters.length > 0, "Book should have chapters");
    console.assert(sampleBook.chapters[0].pages.length >= 3, "Chapter must include text + chatbot + form");
  }, []);

  // Debug logging for column calculations
  useEffect(() => {
    if (colRef.current && page?.type === 'text') {
      const el = colRef.current;
      console.log(`Column Debug - Index: ${textColIndex}/${textColCount}, ClientWidth: ${el.clientWidth}, ScrollWidth: ${el.scrollWidth}, ScrollLeft: ${el.scrollLeft}`);
    }
  }, [textColIndex, textColCount, page]);

  // Recompute column width and count when layout-affecting deps change
  const recomputeCols = () => {
    const el = colRef.current; if (!el) return;
    const width = el.clientWidth; // each column should be exactly this width
    setColWidthPx(width);

    // Wait a frame for column style to apply, then measure columns
    requestAnimationFrame(() => {
      // Simple and reliable approach: if content overflows, calculate columns based on scroll width
      if (el.scrollWidth <= el.clientWidth) {
        // All content fits in one column
        setTextColCount(1);
        setTextColIndex(0);
        setShouldGoToLastColumn(false);
      } else {
        // Calculate total columns based on scroll width vs client width
        // Account for the column gap (2px) between columns
        const columnGap = 2; // matches the CSS columnGap: "2px"
        const effectiveColumnWidth = el.clientWidth + columnGap;
        const total = Math.ceil((el.scrollWidth + columnGap) / effectiveColumnWidth);
        console.log(`Column calculation: scrollWidth=${el.scrollWidth}, clientWidth=${el.clientWidth}, gap=${columnGap}, effectiveWidth=${effectiveColumnWidth}, total=${total}`);
        setTextColCount(total);

        if (shouldGoToLastColumn) {
          setTextColIndex(total - 1);
          setShouldGoToLastColumn(false);
        } else {
          setTextColIndex((idx) => Math.min(idx, total - 1));
        }
      }
    });
  };

  useEffect(() => { recomputeCols(); }, [pageIdx, chapterIdx, settings.fontSize, settings.lineHeight, settings.fontFamily]);
  useEffect(() => { const onResize = () => recomputeCols(); window.addEventListener('resize', onResize); return () => window.removeEventListener('resize', onResize); }, []);

  // Keep scroll in sync with the current column index
  useEffect(() => {
    const el = colRef.current; if (!el || page?.type !== 'text') return;

    // Wait for any layout changes to complete
    requestAnimationFrame(() => {
      // For CSS columns, each "column" in the scroll view is exactly clientWidth wide
      // The browser handles the column layout internally, so we just scroll by viewport widths
      const target = textColIndex * el.clientWidth;

      // Accumulate tolerance for each column to account for rounding errors
      // Each column might have small rounding errors that compound
      const accumulatedTolerance = textColIndex * 2; // 2px per column
      const adjustedTarget = target + accumulatedTolerance;

      console.log(`Scrolling to column ${textColIndex}: target=${target}, tolerance=${accumulatedTolerance}, adjusted=${adjustedTarget}, clientWidth=${el.clientWidth}`);

      el.scrollTo({ left: adjustedTarget, behavior: 'instant' });
    });
  }, [textColIndex, page]);

  // Navigation
  const goNext = () => {
    if (page?.type === 'text') {
      // if textColIndex = 1 and textColCount = 3, go to 2
      // if textColIndex = 2 and textColCount = 3, go to next page
      // if textColIndex = 2 and textColCount = 2, go to next page
      if (textColIndex < textColCount - 1) { setTextColIndex(textColIndex + 1); return; }
    }
    if (pageIdx < chapter.pages.length - 1) {
      setPageIdx(pageIdx + 1);
      if (chapter.pages[pageIdx + 1]?.type === 'text') {
        setTextColIndex(0);
        setShouldGoToLastColumn(false);
      }
    }
    else if (chapterIdx < book.chapters.length - 1) {
      setChapterIdx(chapterIdx + 1);
      setPageIdx(0);
      setShouldGoToLastColumn(false);
    }
  };

  const goPrev = () => {
    if (page?.type === 'text') {
      if (textColIndex > 0) { setTextColIndex(textColIndex - 1); return; }
    }
    if (pageIdx > 0) {
      const prevPageIdx = pageIdx - 1;
      const prevPage = chapter.pages[prevPageIdx];
      setPageIdx(prevPageIdx);
      if (prevPage?.type === 'text') {
        setShouldGoToLastColumn(true);
      }
    }
    else if (chapterIdx > 0) {
      const prevCh = chapterIdx - 1;
      const prevChapter = book.chapters[prevCh];
      const lastPageIdx = prevChapter.pages.length - 1;
      const lastPage = prevChapter.pages[lastPageIdx];
      setChapterIdx(prevCh);
      setPageIdx(lastPageIdx);
      if (lastPage?.type === 'text') {
        setShouldGoToLastColumn(true);
      }
    }
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-900 dark:to-slate-800 text-foreground flex flex-col">
      {/* Modern Header */}
      <div className="h-16 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 flex-shrink-0">
        <div className="px-4 h-full flex items-center">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Menu" className="hover:bg-gray-100 dark:hover:bg-gray-800 flex-shrink-0">
                    <Menu className="h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Índice de Contenidos</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-1 max-h-96 overflow-y-auto">
                    {book.chapters.map((ch, idx) => (
                      <DialogClose key={idx} asChild>
                        <button
                          className={`w-full text-left p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors ${
                            idx === chapterIdx ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-medium' : ''
                          }`}
                          onClick={() => {
                            setChapterIdx(idx);
                            setPageIdx(0);
                            setTextColIndex(0);
                          }}
                        >
                          <div className="text-sm font-medium">{ch.title || `Chapter ${idx + 1}`}</div>
                          <div className="text-xs text-muted-foreground mt-1">{ch.pages.length} pages</div>
                        </button>
                      </DialogClose>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
              
              <div className="relative flex-1 min-w-0">
                <div 
                  className="cursor-pointer group"
                  onMouseEnter={() => setShowBookInfo(true)}
                  onMouseLeave={() => setShowBookInfo(false)}
                  onClick={() => setShowBookInfo(!showBookInfo)}
                >
                  <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
                    {chapter.title}
                  </h1>
                  <p className="text-sm text-gray-500 dark:text-gray-500 truncate">
                    Capítulo {chapterIdx + 1}
                  </p>
                </div>
                
                {/* Book Info Notch */}
                {showBookInfo && (
                  <div className="absolute top-full left-0 mt-2 p-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg shadow-lg z-50 min-w-64 animate-in fade-in-0 zoom-in-95 duration-200">
                    <div className="text-sm font-medium">{book.title}</div>
                    <div className="text-xs opacity-80 mt-1">{book.author} · {book.year}</div>
                    {/* Notch arrow */}
                    <div className="absolute -top-1 left-4 w-2 h-2 bg-gray-900 dark:bg-gray-100 rotate-45"></div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Configuración de Lectura"
                    title="Configuración de Lectura"
                    className="hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    <Settings className="h-5 w-5" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[480px]">
                  <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">Preferencias de Lectura</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-6">
                    <div className="space-y-3">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Tamaño de Fuente</label>
                      <div className="flex items-center justify-center gap-4">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setSettings({ ...settings, fontSize: Math.max(12, settings.fontSize - 2) })}
                          disabled={settings.fontSize <= 12}
                          className="h-12 w-12 text-base hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          T
                        </Button>
                        <span className="text-lg font-medium min-w-[3ch] text-center bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded">
                          {settings.fontSize}px
                        </span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setSettings({ ...settings, fontSize: Math.min(32, settings.fontSize + 2) })}
                          disabled={settings.fontSize >= 32}
                          className="h-12 w-12 text-xl font-bold hover:bg-gray-50 dark:hover:bg-gray-800"
                        >
                          T
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Familia de Fuente</label>
                      <div className="grid grid-cols-3 gap-2">
                        {(['serif', 'sans', 'mono'] as const).map((font) => (
                          <Button
                            key={font}
                            variant={settings.fontFamily === font ? "default" : "outline"}
                            size="sm"
                            onClick={() => setSettings({ ...settings, fontFamily: font })}
                            className="capitalize font-medium"
                          >
                            {font === 'serif' ? 'Aa' : font === 'sans' ? 'Aa' : 'Aa'}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 mx-auto max-w-5xl flex flex-col h-full w-full min-h-0 fade-in">
        <div className="flex-1 bg-white dark:bg-gray-900 book-shadow border border-gray-200/50 dark:border-gray-700/50 flex flex-col min-h-0 overflow-hidden page-transition">
          {/* Reading Content */}
          <div className="flex-1 flex flex-col min-h-0">
            <div
              className={`relative flex-1 overflow-hidden reading-text custom-scrollbar ${styles.readerContent} ${
                settings.fontFamily === 'serif' ? 'font-serif' : 
                settings.fontFamily === 'sans' ? 'font-sans' : 'font-mono'
              } ${
                page?.type === 'text' ? 'p-8' : ''
              }`}
              style={{
                '--reader-font-size': `${settings.fontSize}px`,
                '--reader-line-height': settings.lineHeight
              } as React.CSSProperties}
            >
              {page?.type === "text" && (
                <div
                  ref={colRef}
                  className={`h-full w-full overflow-x-auto overflow-y-hidden scrollbar-hide ${styles.columnContainer}`}
                  style={{
                    '--column-width': colWidthPx ? `${colWidthPx}px` : undefined
                  } as React.CSSProperties}
                >
                  <article
                    className={`prose prose-lg dark:prose-invert max-w-none ${styles.proseArticle}`}
                    dangerouslySetInnerHTML={{ __html: page.content }}
                  />
                </div>
              )}

              {page?.type === "chatbot" && (
                <ChatbotPanel
                  chapterIdx={chapterIdx}
                  chapterTitle={chapter.title}
                  config={page.config || { persona: "Helpful assistant" }}
                  messages={chatMessages}
                  setMessages={setChatMessages}
                  fontSize={settings.fontSize}
                />
              )}

              {page?.type === "form" && (
                <FormPage
                  title={page.title || ""}
                  fields={page.fields}
                  fontSize={settings.fontSize}
                  answers={formAnswers}
                  setAnswers={setFormAnswers}
                />
              )}

              {page?.type === "audio" && (
                <div className="h-full w-full flex flex-col bg-gradient-to-b from-purple-50/50 to-pink-50/50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-lg">
                  {/* Audio Header */}
                  <div className="px-6 py-4 border-b border-purple-200/50 dark:border-purple-800/50 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-t-lg">
                    <h3 className="text-lg font-semibold text-purple-900 dark:text-purple-100 mb-3">🎵 Audio Content</h3>
                    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-purple-200/50 dark:border-purple-700/50 shadow-sm">
                    <audio controls src={page.url} className="w-full">
                        Tu navegador no soporta el elemento de audio.
                    </audio>
                    </div>
                  </div>
                  {/* Audio Transcript/Content */}
                  <div className="flex-1 overflow-y-auto custom-scrollbar">
                    <div
                      className="prose prose-lg dark:prose-invert max-w-none p-6 reading-text"
                      dangerouslySetInnerHTML={{ __html: page.htmlContent }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Chapter Progress Bar */}
          <div className="px-8 py-2 border-t border-gray-200/50 dark:border-gray-700/50">
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500 progress-bar rounded-full transition-all duration-500"
                style={{ 
                  width: `${((pageIdx * (page?.type === 'text' && textColCount > 1 ? textColCount : 1) + 
                    (page?.type === 'text' ? Math.min(textColIndex + 1, textColCount) : 1)) / 
                    (chapter.pages.reduce((acc, p, idx) => {
                      // Calculate total "sections" in chapter - for text pages use textColCount, for others use 1
                      if (p.type === 'text') {
                        // For text pages, we need to estimate column count (use current textColCount as approximation)
                        return acc + (textColCount > 1 ? textColCount : 1);
                      }
                      return acc + 1;
                    }, 0))) * 100}%` 
                }}
              />
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="px-8 py-4 border-t border-gray-200/50 dark:border-gray-700/50 bg-gray-50/30 dark:bg-gray-800/30">
            <div className="flex items-center justify-between">
              <Button 
                size="sm" 
                onClick={goPrev} 
                variant="outline" 
                disabled={chapterIdx === 0 && pageIdx === 0 && textColIndex === 0}
                className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 interactive-element enhanced-focus transition-all duration-200"
              >
                <ChevronLeft className="h-4 w-4" />
                Anterior
              </Button>
              
              <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                <div className="text-center bg-gray-50 dark:bg-gray-800 px-4 py-2 rounded-full">
                  {/* <div className="font-medium text-gray-900 dark:text-gray-100">
                    {page?.type === 'text' ? '📖 Lectura' : 
                     page?.type === 'chatbot' ? '💬 Discusión' : 
                     page?.type === 'form' ? '✍️ Actividad' : '📄 Contenido'}
                  </div> */}
                  <div className="text-xs mt-1">
                    {page?.type === 'text' && textColCount > 1 ? 
                      `Sección ${Math.min(textColIndex + 1, textColCount)} de ${textColCount}` : 
                      `Página ${pageIdx + 1} de ${chapter.pages.length}`
                    }
                  </div>
                </div>
              </div>
              
              <Button 
                size="sm" 
                onClick={goNext} 
                variant="outline"
                className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 interactive-element enhanced-focus transition-all duration-200"
              >
                Siguiente
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}