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
    <div className="h-screen w-full bg-background text-foreground flex flex-col">
      <div className="mx-auto max-w-4xl px-4 py-4 flex flex-col h-full w-full min-h-0">
        <div className="mb-3 text-sm text-muted-foreground flex items-center gap-3 flex-shrink-0">
          <span>{book.title} — {book.author} · {book.year}</span>
        </div>

        <Card className="flex-1 flex flex-col min-h-0">
          <CardHeader className="flex justify-between items-center flex-shrink-0">
            <div className="flex items-center gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Menu"><Menu className="h-5 w-5" /></Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Chapters</DialogTitle>
                  </DialogHeader>
                  <ul className="space-y-2">
                    {book.chapters.map((ch, idx) => (
                      <li key={idx}>
                        <DialogClose asChild>
                          <button
                            className="w-full text-left p-2 hover:bg-muted rounded"
                            onClick={() => {
                              setChapterIdx(idx);
                              setPageIdx(0);
                              setTextColIndex(0);
                            }}
                          >
                            {ch.title || `Chapter ${idx + 1}`}
                          </button>
                        </DialogClose>
                      </li>
                    ))}
                  </ul>
                </DialogContent>
              </Dialog>
              <CardTitle>{chapter.title}</CardTitle>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Configuración de lectura"
                  title="Configuración de lectura"
                >
                  <Settings className="h-5 w-5" />
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[560px]">
                <DialogHeader><DialogTitle>Preferencias de lectura</DialogTitle></DialogHeader>
                <div className="space-y-6">
                  <div className="space-y-3">
                    <label className="text-sm font-medium">Tamaño de fuente</label>
                    <div className="flex items-center justify-center gap-4">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setSettings({ ...settings, fontSize: Math.max(12, settings.fontSize - 2) })}
                        disabled={settings.fontSize <= 12}
                        className="h-12 w-12 text-base"
                      >
                        T
                      </Button>
                      <span className="text-lg font-medium min-w-[3ch] text-center">
                        {settings.fontSize}
                      </span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setSettings({ ...settings, fontSize: Math.min(32, settings.fontSize + 2) })}
                        disabled={settings.fontSize >= 32}
                        className="h-12 w-12 text-xl font-bold"
                      >
                        T
                      </Button>
                    </div>
                  </div>
                  {/* <div className="space-y-2">
                    <label className="text-sm font-medium">Line height: {settings.lineHeight.toFixed(1)}</label>
                    <Slider value={[settings.lineHeight]} min={1.4} max={2.2} step={0.1} onValueChange={([v]) => setSettings({ ...settings, lineHeight: v })} />
                  </div> */}
                </div>
              </DialogContent>
            </Dialog>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col min-h-0">
            <div
              className={`relative flex-1 overflow-hidden rounded-2xl border p-6 ${styles.readerContent}`}
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
                    className={`prose dark:prose-invert max-w-none ${styles.proseArticle}`}
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
                  fields={page.fields}
                  fontSize={settings.fontSize}
                  answers={formAnswers}
                  setAnswers={setFormAnswers}
                />
              )}

              {page?.type === "audio" && (
                <div className="h-full w-full flex flex-col">
                  <div className="p-6 border-b flex-shrink-0">
                    <audio controls src={page.url} className="w-full">
                      Your browser does not support the audio element.
                    </audio>
                  </div>
                  <div
                    className="prose dark:prose-invert max-w-none p-6 overflow-y-auto"
                    dangerouslySetInnerHTML={{ __html: page.htmlContent }}
                  />
                </div>
              )}

            </div>

            <div className="mt-4 text-sm text-muted-foreground flex justify-between items-center flex-shrink-0">
              <div className="flex items-center gap-3">
                <Button size="sm" onClick={goPrev} variant="secondary" disabled={chapterIdx === 0 && pageIdx === 0 && textColIndex === 0}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <div>Page {pageIdx + 1} / {chapter.pages.length}</div>
              </div>
              <div className="flex items-center gap-3">
                <div>
                  {page?.type === 'text' ? (
                    <>Column {Math.min(textColIndex + 1, textColCount)} / {textColCount}</>
                  ) : page?.type === 'chatbot' ? (
                    <>Chatbot</>
                  ) : page?.type === 'form' ? (
                    <>Form</>
                  ) : null}
                </div>
                <Button size="sm" onClick={goNext} variant="secondary">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
