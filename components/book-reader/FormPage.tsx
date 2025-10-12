'use client';

import React, { useEffect } from "react";
import { Field, NumberField, SelectField, CheckboxField } from "@/lib/types/book";

interface FormPageProps {
  title: string;
  fields: Field[];
  fontSize: number;
  answers: Record<string, any>;
  setAnswers: (updater: (prev: Record<string, any>) => Record<string, any>) => void;
}

export default function FormPage({ title, fields, fontSize, answers, setAnswers }: FormPageProps) {
  const labelCls = "block mb-2 leading-normal text-sm font-semibold text-gray-700 dark:text-gray-300";
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
    <div className="h-full w-full overflow-y-auto bg-gradient-to-b from-green-50/50 to-emerald-50/50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg font-sans">
      {/* Form Header */}
      <div className="px-4 py-3 border-b border-green-200/50 dark:border-green-800/50 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-t-lg">
        {title && (
          <div>
            <h1 className={`text-2xl font-bold text-green-900 dark:text-green-100 ${controlClass}`} 
                style={{ fontSize: `${Math.max(fontSize * 1.3, 24)}px` }}>
              {title}
            </h1>
            <p className="text-sm text-green-700 dark:text-green-300 mt-1">
              Responde con una idea concreta desde tu contexto. Puedes agregar ejemplos, propuestas o simplemente una reflexión personal. Las respuestas serán parte de una nube colectiva de ideas.
            </p>
          </div>
        )}
      </div>
      
      {/* Form Content */}
      <div className="">
        {fields.map((f) => {
          if (f.type === "text") {
            return (
              <div key={f.id} className="p-4">
                <label className={labelCls}>{f.label}</label>
                {f.multiline ? (
                  <textarea 
                    className={`w-full rounded-lg border border-gray-300 dark:border-gray-600 p-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm ${controlClass}`} 
                    placeholder={f.placeholder} 
                    value={answers[f.id] ?? ""} 
                    onChange={(e) => setVal(f.id, e.target.value)} 
                    rows={Math.max(4, Math.round(fontSize / 5))} 
                  />
                ) : (
                  <input 
                    className={`w-full rounded-lg border border-gray-300 dark:border-gray-600 p-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent ${controlClass}`} 
                    placeholder={f.placeholder} 
                    value={answers[f.id] ?? ""} 
                    onChange={(e) => setVal(f.id, e.target.value)} 
                  />
                )}
              </div>
            );
          }
          if (f.type === "number") {
            const nf = f as NumberField;
            return (
              <div key={f.id} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
                <label className={labelCls}>{f.label}</label>
                <input 
                  placeholder={f.placeholder} 
                  type="number" 
                  className={`w-40 rounded-lg border border-gray-300 dark:border-gray-600 p-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent ${controlClass}`} 
                  value={answers[f.id] ?? ""} 
                  min={nf.min} 
                  max={nf.max} 
                  onChange={(e) => setVal(f.id, e.target.valueAsNumber)} 
                />
              </div>
            );
          }
          if (f.type === "select") {
            const sf = f as SelectField;
            return (
              <div key={f.id} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
                <label className={labelCls}>{f.label}</label>
                <select 
                  title={f.label} 
                  className={`w-full rounded-lg border border-gray-300 dark:border-gray-600 p-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent ${controlClass}`} 
                  value={answers[f.id] ?? ""} 
                  onChange={(e) => setVal(f.id, e.target.value)}
                >
                  <option value="" disabled>Choose an option...</option>
                  {sf.options.map((opt: string) => (
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
              <div key={f.id} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
                <label className={labelCls}>{f.label}</label>
                <div className="space-y-3">
                  {cf.options.map((opt: string) => (
                    <label key={opt} className="flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg cursor-pointer transition-colors">
                      <input 
                        type="checkbox" 
                        checked={cur.includes(opt)} 
                        onChange={() => toggle(opt)}
                        className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                      />
                      <span className={`${controlClass} text-gray-900 dark:text-gray-100`}>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
}
