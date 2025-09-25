'use client';

import React, { useEffect } from "react";
import { Field } from "@/lib/types/book";

interface FormPageProps {
  fields: Field[];
  fontSize: number;
  answers: Record<string, any>;
  setAnswers: (updater: (prev: Record<string, any>) => Record<string, any>) => void;
}

export default function FormPage({ fields, fontSize, answers, setAnswers }: FormPageProps) {
  const labelCls = "block mb-1";
  const controlClass = `custom-font-size custom-line-height`;
  
  // Update text size styles based on the fontSize prop
  useEffect(() => {
    // This ensures form fields use the same font size as text content
    if (typeof document !== 'undefined' && document.documentElement) {
      document.documentElement.style.setProperty('--reader-font-size', `${fontSize}px`);
    }
  }, [fontSize]);

  const setVal = (id: string, val: any) => setAnswers((prev) => ({ ...prev, [id]: val }));

  return (
    <div className="h-full w-full overflow-y-auto pr-1 space-y-3">
      {fields.map((f) => {
        if (f.type === "text") {
          return (
            <div key={f.id}>
              <label className={labelCls}>{f.label}</label>
              {f.multiline ? (
                <textarea className={`w-full rounded-xl border p-2 bg-background ${controlClass}`} placeholder={f.placeholder} value={answers[f.id] ?? ""} onChange={(e) => setVal(f.id, e.target.value)} rows={Math.max(3, Math.round(fontSize / 6))} />
              ) : (
                <input className={`w-full rounded-xl border p-2 bg-background ${controlClass}`} placeholder={f.placeholder} value={answers[f.id] ?? ""} onChange={(e) => setVal(f.id, e.target.value)} />
              )}
            </div>
          );
        }
        if (f.type === "number") {
          return (
            <div key={f.id}>
              <label className={labelCls}>{f.label}</label>
              <input placeholder={f.placeholder} type="number" className={`w-40 rounded-xl border p-2 bg-background ${controlClass}`} value={answers[f.id] ?? ""} min={(f as NumberField).min} max={(f as NumberField).max} onChange={(e) => setVal(f.id, e.target.valueAsNumber)} />
            </div>
          );
        }
        if (f.type === "select") {
          const sf = f as SelectField;
          return (
            <div key={f.id}>
              <label className={labelCls}>{f.label}</label>
              <select title={f.label} className={`w-full rounded-xl border p-2 bg-background ${controlClass}`} value={answers[f.id] ?? ""} onChange={(e) => setVal(f.id, e.target.value)}>
                <option value="" disabled>Choose…</option>
                {sf.options.map((opt) => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>
          );
        }
        if (f.type === "checkboxes") {
          const cf = f as CheckboxField;
          const cur: string[] = Array.isArray(answers[f.id]) ? answers[f.id] : [];
          const toggle = (opt: string) => {
            const next = cur.includes(opt) ? cur.filter((v) => v !== opt) : [...cur, opt];
            setVal(f.id, next);
          };
          return (
            <div key={f.id}>
              <label className={labelCls}>{f.label}</label>
              <div className="flex flex-col gap-1">
                {cf.options.map((opt) => (
                  <label key={opt} className="inline-flex items-center gap-2">
                    <input type="checkbox" checked={cur.includes(opt)} onChange={() => toggle(opt)} />
                    <span className={controlClass}>{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

// Add these imports at the top of the file
import { NumberField, SelectField, CheckboxField } from "@/lib/types/book";
