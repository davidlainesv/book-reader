// Book reader types

// Chat message type
export type ChatMsg = { role: "user" | "assistant"; content: string };
// Chatbot config: keep a stable persona and instructions per chapter
export type ChatbotConfig = { systemPrompt?: string; persona?: string; instruction?: string, title?: string };

// Form field types
export type TextField = { type: "text"; id: string; label: string; placeholder?: string; multiline?: boolean };
export type NumberField = { type: "number"; id: string; label: string; placeholder?: string; min?: number; max?: number };
export type SelectField = { type: "select"; id: string; label: string; options: string[] };
export type CheckboxField = { type: "checkboxes"; id: string; label: string; options: string[] };
export type Field = TextField | NumberField | SelectField | CheckboxField;

// Content Types for Book Pages
export type TextContent = {
  type: "text";
  content: string;
};

export type ChatbotContent = {
  type: "chatbot";
  config?: ChatbotConfig;
};

export type FormContent = {
  type: "form";
  title: string;
  fields: Field[];
};

export type AudioContent = {
  type: "audio";
  url: string;
  htmlContent: string;
};

export type CoverContent = {
  type: "cover";
  title: string;
  isBookCover?: boolean; // true for main book cover, false/undefined for chapter covers
};

export type IndexContent = {
  type: "index";
  title: string;
};

export type BiographyContent = {
  type: "biography";
  authorName: string;
  content: string;
};

export type Author = {
  name: string;
  role?: string; // "Autor", "Coautor", "Editor", etc.
  bio?: string;
  affiliation?: string;
  photo?: string; // URL to author photo
};

export type AuthorsContent = {
  type: "authors";
  title: string;
  authors: Author[];
};

export type AcknowledgmentsContent = {
  type: "acknowledgments";
  title: string;
  content: string;
};

export type PageContent = TextContent | ChatbotContent | FormContent | AudioContent | CoverContent | IndexContent | BiographyContent | AuthorsContent | AcknowledgmentsContent;

// Book structure
export interface Chapter {
  title: string;
  pages: PageContent[];
  chatbot?: ChatbotConfig;
  form?: {
    fields: Field[];
  };
}

export interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
  cover?: CoverContent; // Optional book cover
  authors?: AuthorsContent; // Optional authors page
  acknowledgments?: AcknowledgmentsContent; // Optional acknowledgments page
  index?: IndexContent; // Optional index page
  chapters: Chapter[];
}

// For rendering in the UI
export type DisplayPage =
  | { type: "text"; lines: string[] }
  | { type: "chatbot" }
  | { type: "form"; fields: Field[] }
  | { type: "audio"; url: string; htmlContent: string }
  | { type: "cover"; title: string; isBookCover?: boolean }
  | { type: "index"; title: string }
  | { type: "biography"; authorName: string; content: string }
  | { type: "authors"; title: string; authors: Author[] }
  | { type: "acknowledgments"; title: string; content: string };

// Settings type
export interface ReaderSettings {
  fontSize: number;
  fontFamily: "serif" | "sans" | "mono";
  theme: "light" | "dark" | "system";
}

// Settings type
export interface ReaderSettings {
  fontSize: number;
  fontFamily: "serif" | "sans" | "mono";
  theme: "light" | "dark" | "system";
}
