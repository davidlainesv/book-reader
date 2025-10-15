'use client';

import React, { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Menu, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import ChatbotPage from "./ChatbotPage";
import FormPage from "./FormPage";
import AudioPage from "./AudioPage";
import { BookCoverBackground } from "./BookCoverBackground";
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
  const chapterTitleRef = useRef<HTMLDivElement | null>(null); // ref for chapter title positioning
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
  const [showBookCover, setShowBookCover] = useState(book.cover ? true : false); // Show book cover initially if it exists
  const [showIndex, setShowIndex] = useState(false); // Show index after book cover
  const [chatMessages, setChatMessages] = useState<ChatMsg[]>([]);
  const [formAnswers, setFormAnswers] = useState<Record<string, string | number | string[]>>({});
  const [showBookInfo, setShowBookInfo] = useState(false);

  const chapter = book.chapters[chapterIdx];
  const page = showBookCover ? book.cover : showIndex ? book.index : chapter.pages[pageIdx];

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
  const recomputeCols = useCallback(() => {
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
  }, [shouldGoToLastColumn]);

  useEffect(() => { recomputeCols(); }, [pageIdx, chapterIdx, settings.fontSize, settings.lineHeight, settings.fontFamily, recomputeCols]);
  useEffect(() => { const onResize = () => recomputeCols(); window.addEventListener('resize', onResize); return () => window.removeEventListener('resize', onResize); }, [recomputeCols]);

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
    // If showing book cover, go to index (if exists) or first chapter
    if (showBookCover) {
      setShowBookCover(false);
      if (book.index) {
        setShowIndex(true);
      } else {
        setChapterIdx(0);
        setPageIdx(0);
      }
      setTextColIndex(0);
      setShouldGoToLastColumn(false);
      return;
    }

    // If showing index, go to first chapter
    if (showIndex) {
      setShowIndex(false);
      setChapterIdx(0);
      setPageIdx(0);
      setTextColIndex(0);
      setShouldGoToLastColumn(false);
      return;
    }

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
      setTextColIndex(0);
      setShouldGoToLastColumn(false);
    }
  };

  const goPrev = () => {
    // If on index, go back to book cover
    if (showIndex && book.cover) {
      setShowIndex(false);
      setShowBookCover(true);
      return;
    }

    // If showing index and no book cover, can't go back
    if (showIndex) {
      return;
    }

    // If on first chapter first page, go back to index or book cover
    if (!showBookCover && chapterIdx === 0 && pageIdx === 0 && textColIndex === 0) {
      if (book.index) {
        setShowIndex(true);
        return;
      } else if (book.cover) {
        setShowBookCover(true);
        return;
      }
    }

    // If showing book cover, can't go back further
    if (showBookCover) {
      return;
    }

    if (page?.type === 'text') {
      if (textColIndex > 0) { setTextColIndex(textColIndex - 1); return; }
    }
    if (pageIdx > 0) {
      const prevPageIdx = pageIdx - 1;
      const prevPage = chapter.pages[prevPageIdx];
      setPageIdx(prevPageIdx);
      if (prevPage?.type === 'text') {
        setShouldGoToLastColumn(true);
      } else {
        setTextColIndex(0);
        setShouldGoToLastColumn(false);
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
      } else {
        setTextColIndex(0);
        setShouldGoToLastColumn(false);
      }
    }
  };

  return (
    <div className="w-full bg-gradient-to-br from-slate-50 to-gray-100 dark:from-gray-900 dark:to-slate-800 text-foreground flex flex-col" style={{ height: '100dvh' }}>
      {/* Modern Header - Hidden on book cover and index */}
      {!showBookCover && !showIndex && (
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
                    {book.cover && (
                      <DialogClose asChild>
                        <button
                          className={`w-full text-left p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors ${showBookCover ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-medium' : ''
                            }`}
                          onClick={() => {
                            setShowBookCover(true);
                            setShowIndex(false);
                            setChapterIdx(0);
                            setPageIdx(0);
                            setTextColIndex(0);
                          }}
                        >
                          <div className="text-sm font-medium">📚 {book.title}</div>
                          <div className="text-xs text-muted-foreground mt-1">Portada del libro</div>
                        </button>
                      </DialogClose>
                    )}
                    {book.index && (
                      <DialogClose asChild>
                        <button
                          className={`w-full text-left p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors ${showIndex ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-medium' : ''
                            }`}
                          onClick={() => {
                            setShowBookCover(false);
                            setShowIndex(true);
                            setChapterIdx(0);
                            setPageIdx(0);
                            setTextColIndex(0);
                          }}
                        >
                          <div className="text-sm font-medium">📑 Índice</div>
                          <div className="text-xs text-muted-foreground mt-1">Tabla de contenidos</div>
                        </button>
                      </DialogClose>
                    )}
                    {book.chapters.map((ch, idx) => (
                      <DialogClose key={idx} asChild>
                        <button
                          className={`w-full text-left p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors ${!showBookCover && !showIndex && idx === chapterIdx ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 font-medium' : ''
                            }`}
                          onClick={() => {
                            setShowBookCover(false);
                            setShowIndex(false);
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
                  ref={chapterTitleRef}
                  className="cursor-pointer group"
                  onMouseEnter={() => setShowBookInfo(true)}
                  onMouseLeave={() => setShowBookInfo(false)}
                  onClick={() => setShowBookInfo(!showBookInfo)}
                >
                  {showBookCover ? (
                    <>
                      <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
                        {book.title}
                      </h1>
                      <p className="text-sm text-gray-500 dark:text-gray-500 truncate">
                        {book.author}
                      </p>
                    </>
                  ) : showIndex ? (
                    <>
                      <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
                        Índice
                      </h1>
                      <p className="text-sm text-gray-500 dark:text-gray-500 truncate">
                        {book.title}
                      </p>
                    </>
                  ) : (
                    <>
                      <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
                        {chapter.title}
                      </h1>
                      <p className="text-sm text-gray-500 dark:text-gray-500 truncate">
                        Capítulo {chapterIdx + 1}
                      </p>
                    </>
                  )}
                </div>
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
      )}

      {/* Main Content Area */}
      <div className="flex-1 mx-auto max-w-5xl flex flex-col h-full w-full min-h-0 fade-in">
        <div className="flex-1 bg-white dark:bg-gray-900 book-shadow border border-gray-200/50 dark:border-gray-700/50 flex flex-col min-h-0 overflow-hidden page-transition">
          {/* Reading Content */}
          <div className="flex-1 flex flex-col min-h-0">
            <div
              className={`relative flex-1 overflow-hidden reading-text custom-scrollbar ${styles.readerContent} ${settings.fontFamily === 'serif' ? 'font-serif' :
                  settings.fontFamily === 'sans' ? 'font-sans' : 'font-mono'
                } ${page?.type === 'text' ? 'p-8' : page?.type === 'cover' ? '' : ''
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
                <ChatbotPage
                  chapterIdx={chapterIdx}
                  chapterTitle={chapter.title}
                  config={page.config || { persona: "Helpful assistant", title: "Reflexiona con la IA" }}
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
                <AudioPage
                  url={page.url}
                  htmlContent={page.htmlContent}
                  fontSize={settings.fontSize}
                />
              )}

              {page?.type === "cover" && (
                <>
                  {page.isBookCover ? (
                    // Main book cover with animated SVG background
                    <div className="h-full w-full relative overflow-hidden">
                      <BookCoverBackground />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/10 dark:bg-black/30 backdrop-blur-[1px] overflow-y-auto">
                        <div className="text-center px-4 sm:px-8 py-20 sm:py-8 max-w-4xl z-10 w-full min-h-full flex flex-col justify-center">
                          <h1 
                            className="font-bold text-white drop-shadow-2xl leading-tight mb-4 sm:mb-6"
                            style={{
                              fontSize: `clamp(36px, 9vw, 72px)`,
                              lineHeight: 1.2,
                              textShadow: '0 4px 20px rgba(0,0,0,0.5), 0 2px 10px rgba(0,0,0,0.3)'
                            }}
                          >
                            {page.title}
                          </h1>
                          <div className="flex items-center justify-center gap-3 sm:gap-4 mt-4 sm:mt-8">
                            <div className="h-1 w-12 sm:w-16 bg-gradient-to-r from-transparent via-white to-transparent opacity-70 rounded-full"></div>
                            <div className="h-2 w-2 bg-white rounded-full opacity-70"></div>
                            <div className="h-1 w-12 sm:w-16 bg-gradient-to-r from-transparent via-white to-transparent opacity-70 rounded-full"></div>
                          </div>
                          <div className="mt-4 sm:mt-8 text-white/90 text-base sm:text-lg font-medium drop-shadow-lg">
                            {book.author}
                          </div>
                          <div className="mt-2 text-white/80 text-sm sm:text-base drop-shadow-lg">
                            {book.year}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    // Chapter cover - more subtle styling
                    <div className="h-full w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-slate-100 dark:from-gray-800/50 dark:to-slate-800/50">
                      <div className="text-center px-8 max-w-4xl">
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                          Capítulo {chapterIdx + 1}
                        </div>
                        <h2 
                          className="font-semibold text-gray-800 dark:text-gray-200 leading-tight"
                          style={{
                            fontSize: `${Math.min(Math.max(settings.fontSize * 2, 28), 42)}px`,
                            lineHeight: settings.lineHeight
                          }}
                        >
                          {page.title}
                        </h2>
                        <div className="w-16 h-0.5 bg-gradient-to-r from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-500 mx-auto rounded-full mt-6 opacity-60"></div>
                      </div>
                    </div>
                  )}
                </>
              )}

              {page?.type === "index" && (
                <div className="h-full w-full overflow-y-auto p-8">
                  <div className="max-w-3xl mx-auto">
                    <h1 
                      className="font-bold text-gray-900 dark:text-gray-100 mb-2 text-center"
                      style={{
                        fontSize: `${Math.min(Math.max(settings.fontSize * 2.5, 32), 48)}px`,
                        lineHeight: settings.lineHeight
                      }}
                    >
                      {page.title}
                    </h1>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 mx-auto rounded-full mb-12"></div>
                    
                    <div className="space-y-4">
                      {book.chapters.map((ch, idx) => {
                        // Calculate the page number where this chapter starts
                        // Book cover = page 1, Index = page 2, then chapters start
                        let startPage = 1; // Start counting from 1
                        if (book.cover) startPage++;
                        if (book.index) startPage++;
                        
                        // Add pages from previous chapters
                        for (let i = 0; i < idx; i++) {
                          startPage += book.chapters[i].pages.length;
                        }
                        
                        return (
                          <button
                            key={idx}
                            onClick={() => {
                              setShowBookCover(false);
                              setShowIndex(false);
                              setChapterIdx(idx);
                              setPageIdx(0);
                              setTextColIndex(0);
                            }}
                            className="w-full text-left p-4 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                          >
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                                  Capítulo {idx + 1}
                                </div>
                                <div 
                                  className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"
                                  style={{ fontSize: `${settings.fontSize}px` }}
                                >
                                  {ch.title}
                                </div>
                              </div>
                              <div className="text-right flex-shrink-0">
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  Página {startPage}
                                </div>
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Chapter Progress Bar */}
          {!showBookCover && !showIndex && (
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
          )}

          {/* Navigation Controls */}
          {showBookCover ? (
            // Animated arrow button for book cover at bottom right
            <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50">
              <Button
                size="lg"
                onClick={goNext}
                className="h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 shadow-2xl flex items-center justify-center animate-pulse hover:animate-none transition-all duration-300 hover:scale-110"
              >
                <ChevronRight className="h-7 w-7 sm:h-8 sm:w-8" />
              </Button>
            </div>
          ) : (
            <div className="px-8 py-4 border-t border-gray-200/50 dark:border-gray-700/50 bg-gray-50/30 dark:bg-gray-800/30">
              <div className="flex items-center justify-between">
              <Button
                size="sm"
                onClick={goPrev}
                variant="outline"
                disabled={showBookCover || (showIndex && !book.cover) || (chapterIdx === 0 && pageIdx === 0 && textColIndex === 0 && !book.cover && !book.index)}
                className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 interactive-element enhanced-focus transition-all duration-200"
              >
                <ChevronLeft className="h-4 w-4" />
                Anterior
              </Button>

              <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
                <div className="text-center bg-gray-50 dark:bg-gray-800 px-4 py-2 rounded-full">
                  {showBookCover ? (
                    <div className="font-medium text-gray-900 dark:text-gray-100">
                      📚 Portada del Libro
                    </div>
                  ) : showIndex ? (
                    <div className="font-medium text-gray-900 dark:text-gray-100">
                      📑 Índice
                    </div>
                  ) : (
                    <>
                      <div className="font-medium text-gray-900 dark:text-gray-100">
                        {page?.type === 'cover' ? '📑 Portada' :
                         page?.type === 'text' ? '📖 Lectura' : 
                         page?.type === 'chatbot' ? '💬 Discusión' : 
                         page?.type === 'form' ? '✍️ Actividad' : 
                         page?.type === 'audio' ? '🎧 Audio' : '📄 Contenido'}
                      </div>
                      <div className="text-xs mt-1">
                        {page?.type === 'text' && textColCount > 1 ? 
                          `Sección ${Math.min(textColIndex + 1, textColCount)} de ${textColCount}` : 
                          `Página ${pageIdx + 1} de ${chapter.pages.length}`
                        }
                      </div>
                    </>
                  )}
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
          )}
        </div>
      </div>

      {/* Book Info Notch - Portal positioned at document level */}
      {showBookInfo && chapterTitleRef.current && typeof document !== 'undefined' && (
        (() => {
          const titleRect = chapterTitleRef.current.getBoundingClientRect();
          return (
            <div
              className="fixed p-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg shadow-lg min-w-64 animate-in fade-in-0 zoom-in-95 duration-200"
              style={{
                top: titleRect.bottom + 8,
                left: titleRect.left,
                zIndex: 9999
              }}
            >
              <div className="text-sm font-medium">{book.title}</div>
              <div className="text-xs opacity-80 mt-1">{book.author} · {book.year}</div>
              {/* Notch arrow */}
              <div
                className="absolute w-2 h-2 bg-gray-900 dark:bg-gray-100 rotate-45"
                style={{
                  top: -4,
                  left: 16
                }}
              />
            </div>
          );
        })()
      )}
    </div>
  );
}