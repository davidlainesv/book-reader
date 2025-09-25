import { Field, DisplayPage } from "@/lib/types/book";

// Utility functions for text and layout

// Clamp a value between min and max
export function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

// Get font stack based on font family setting
export function fontStack(fontFamilySetting: "serif" | "sans" | "mono") {
  return fontFamilySetting === "serif"
    ? "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif"
    : fontFamilySetting === "sans"
      ? "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, 'Apple Color Emoji', 'Segoe UI Emoji'"
      : "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace";
}

// Get font specification for CSS
export function fontSpec(fontFamilySetting: "serif" | "sans" | "mono", fontSize: number) {
  return `${fontSize}px ${fontStack(fontFamilySetting)}`;
}

// Escape HTML special characters
export function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

// Calculate the visible part of text content based on font size and viewport
export function calculateVisibleContent(
  lines: string[],
  widthPx: number,
  heightPx: number,
  font: string,
  lineHeightPx: number,
  lineOffset: number = 0
): { visibleLines: string[]; hasMoreContent: boolean; totalLineCount: number; visibleLineCount: number } {
  try {
    // Safety checks for parameters
    if (!lines || !Array.isArray(lines)) {
      console.warn("Invalid lines provided to calculateVisibleContent:", lines);
      return { visibleLines: ["[No content available]"], hasMoreContent: false, totalLineCount: 0, visibleLineCount: 0 };
    }
    
    if (widthPx <= 0 || heightPx <= 0 || lineHeightPx <= 0) {
      console.warn("Invalid dimensions in calculateVisibleContent:", { widthPx, heightPx, lineHeightPx });
      return { visibleLines: lines, hasMoreContent: false, totalLineCount: lines.length, visibleLineCount: lines.length };
    }
    
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return { visibleLines: lines, hasMoreContent: false, totalLineCount: lines.length, visibleLineCount: lines.length };
    ctx.font = font;
    
    // Calculate how many lines can fit in the current viewport height
    // The exact number of lines to show is critical for Google Books-style pagination
    const linesPerViewport = Math.max(1, Math.floor(heightPx / Math.max(1, lineHeightPx)));
    
    // Apply the lineOffset to get the correct portion of content
    const remainingLines = lines.slice(lineOffset);
    
    // Get the number of lines that will fit in the viewport
    const visibleLines = remainingLines.slice(0, linesPerViewport);
    const hasMoreContent = lineOffset + visibleLines.length < lines.length;
    const totalLineCount = lines.length;
    const visibleLineCount = visibleLines.length;
    
    return { visibleLines, hasMoreContent, totalLineCount, visibleLineCount };
  } catch (error) {
    console.error("Error in calculateVisibleContent:", error);
    return { visibleLines: lines, hasMoreContent: false, totalLineCount: lines.length, visibleLineCount: lines.length };
  }
}

// For forms, determine which fields can be displayed in the current view
export function calculateVisibleFormFields(
  fields: Field[],
  heightPx: number,
  font: string,
  lineHeightPx: number,
  fieldOffset: number = 0
): { visibleFields: Field[]; hasMoreFields: boolean; nextFieldOffset: number } {
  try {
    // Safety checks for parameters
    if (!fields || !Array.isArray(fields)) {
      console.warn("Invalid fields provided to calculateVisibleFormFields:", fields);
      return { visibleFields: [], hasMoreFields: false, nextFieldOffset: 0 };
    }
    
    if (heightPx <= 0 || lineHeightPx <= 0) {
      console.warn("Invalid dimensions in calculateVisibleFormFields:", { heightPx, lineHeightPx });
      return { visibleFields: fields, hasMoreFields: false, nextFieldOffset: fields.length };
    }
    
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return { visibleFields: fields, hasMoreFields: false, nextFieldOffset: fields.length };
    ctx.font = font;

    // Get the fields that will fit in the viewport starting from the offset
    const remainingFields = fields.slice(fieldOffset);
    let totalHeight = 0;
    let fieldsToShow = 0;
    
    for (const field of remainingFields) {
      const fieldLines = measureFieldLines(field, ctx, heightPx);
      const fieldHeight = fieldLines * lineHeightPx + 16; // Adding some margin between fields
      
      if (totalHeight + fieldHeight <= heightPx) {
        totalHeight += fieldHeight;
        fieldsToShow++;
      } else {
        // This field won't fit, stop here
        break;
      }
    }
    
    const visibleFields = remainingFields.slice(0, fieldsToShow);
    const hasMoreFields = fieldOffset + fieldsToShow < fields.length;
    const nextFieldOffset = fieldOffset + fieldsToShow;
    
    return { visibleFields, hasMoreFields, nextFieldOffset };
  } catch (error) {
    console.error("Error in calculateVisibleFormFields:", error);
    return { visibleFields: fields, hasMoreFields: false, nextFieldOffset: fields.length };
  }
}

// Measure how many line slots a form field consumes
export function measureFieldLines(field: Field, ctx: CanvasRenderingContext2D, widthPx: number): number {
  const measureTextLines = (text: string) => {
    const words = text.split(/\s+/).filter(Boolean);
    let line = "";
    let count = 0;
    for (const w of words) {
      const trial = line ? line + " " + w : w;
      if (ctx.measureText(trial).width <= widthPx) {
        line = trial;
      } else {
        if (line) count++;
        line = w;
      }
    }
    if (line) count++;
    return count || 1;
  };

  const labelLines = measureTextLines(field.label);

  switch (field.type) {
    case "text":
      return labelLines + (field.multiline ? 3 : 1) + 1; // +1 for spacing
    case "number":
      return labelLines + 1 + 1;
    case "select":
      // label + (selected line) + options preview (one per option)
      return labelLines + 1 + Math.max(1, field.options.length) + 1;
    case "checkboxes":
      return labelLines + Math.max(1, field.options.length) + 1;
    default:
      return labelLines + 1;
  }
}

// Lay out form into multiple pages according to available line slots
export function layoutFormPages(fields: Field[], widthPx: number, font: string, lineHeightPx: number, viewportHeightPx: number): DisplayPage[] {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) return [{ type: "form", fields }];
  ctx.font = font;

  const linesPerPage = Math.max(1, Math.floor(viewportHeightPx / Math.max(1, lineHeightPx)));

  const pages: DisplayPage[] = [];
  let bucket: Field[] = [];
  let used = 0;

  for (const f of fields) {
    const need = measureFieldLines(f, ctx, widthPx);
    if (used + need > linesPerPage && bucket.length) {
      pages.push({ type: "form", fields: bucket });
      bucket = [];
      used = 0;
    }
    bucket.push(f);
    used += Math.min(need, linesPerPage); // cap to avoid single item overflow
  }
  if (bucket.length) pages.push({ type: "form", fields: bucket });
  return pages.length ? pages : [{ type: "form", fields }];
}
