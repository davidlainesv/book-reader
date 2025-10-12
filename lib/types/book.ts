// Book reader types

// Chat message type
export type ChatMsg = { role: "user" | "assistant"; content: string };
// Chatbot config: keep a stable persona and instructions per chapter
export type ChatbotConfig = { systemPrompt?: string; persona?: string; instruction?: string };

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

export type PageContent = TextContent | ChatbotContent | FormContent | AudioContent;

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
  chapters: Chapter[];
}

// For rendering in the UI
export type DisplayPage =
  | { type: "text"; lines: string[] }
  | { type: "chatbot" }
  | { type: "form"; fields: Field[] }
  | { type: "audio"; url: string; htmlContent: string };

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
