'use client';

import React, { useEffect, useState, useCallback } from "react";
import { Field, NumberField, SelectField, CheckboxField } from "@/lib/types/book";

interface FormPageProps {
  title: string;
  fields: Field[];
  fontSize: number;
  answers: Record<string, string | number | string[]>;
  setAnswers: (updater: (prev: Record<string, string | number | string[]>) => Record<string, string | number | string[]>) => void;
  onSubmit?: () => void;
  bookId?: string;
  chapterTitle?: string;
}

// Generate a unique key for sessionStorage based on form identity
const getFormSessionKey = (bookId?: string, chapterTitle?: string, formTitle?: string) => {
  return `form_submitted_${bookId || 'unknown'}_${chapterTitle || 'no-chapter'}_${formTitle || 'no-title'}`;
};

export default function FormPage({ title, fields, fontSize, answers, setAnswers, onSubmit, bookId, chapterTitle }: FormPageProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [hasSubmittedBefore, setHasSubmittedBefore] = useState(false);
  const [isEditingNewResponse, setIsEditingNewResponse] = useState(false);

  const sessionKey = getFormSessionKey(bookId, chapterTitle, title);

  // Check sessionStorage on mount to see if form was already submitted
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const submitted = sessionStorage.getItem(sessionKey);
      if (submitted === 'true') {
        setHasSubmittedBefore(true);
        setSubmitStatus('success');
      }
    }
  }, [sessionKey]);

  const labelCls = "block mb-2 leading-normal text-sm font-semibold text-gray-700 dark:text-gray-300";
  const controlClass = `custom-font-size custom-line-height`;

  // Determine if fields should appear disabled (submitted but not editing new response)
  const isFieldsDisabled = hasSubmittedBefore && !isEditingNewResponse;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/form-response', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bookId: bookId || 'unknown',
          chapterTitle: chapterTitle || null,
          formTitle: title || null,
          responses: answers,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit form');
      }

      setSubmitStatus('success');
      setHasSubmittedBefore(true);
      setIsEditingNewResponse(false);
      
      // Save to sessionStorage
      if (typeof window !== 'undefined') {
        sessionStorage.setItem(sessionKey, 'true');
      }
      
      onSubmit?.();
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Error al enviar respuestas');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewResponse = useCallback(() => {
    // Reset form answers
    setAnswers(() => ({}));
    // Enable editing mode
    setIsEditingNewResponse(true);
    setSubmitStatus('idle');
  }, [setAnswers]);

  // Update text size styles based on the fontSize prop
  useEffect(() => {
    // This ensures form fields use the same font size as text content
    if (typeof document !== 'undefined' && document.documentElement) {
      document.documentElement.style.setProperty('--reader-font-size', `${fontSize}px`);
    }
  }, [fontSize]);

  const setVal = (id: string, val: string | number | string[]) => {
    if (!isFieldsDisabled) {
      setAnswers((prev) => ({ ...prev, [id]: val }));
    }
  };

  // Common disabled styles for inputs
  const disabledStyles = isFieldsDisabled 
    ? 'opacity-60 cursor-not-allowed bg-gray-100 dark:bg-gray-800' 
    : '';

  return (
    <div className="h-full w-full overflow-y-auto bg-gradient-to-b from-green-50/50 to-emerald-50/50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-lg font-sans">
      {/* Form Header */}
      <div className="px-4 py-3 pt-1.5 border-b border-green-200/50 dark:border-green-800/50 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-t-lg">
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
                    className={`w-full rounded-lg border border-gray-300 dark:border-gray-600 p-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent text-base ${disabledStyles}`}
                    style={{ userSelect: 'text', WebkitUserSelect: 'text' }}
                    placeholder={f.placeholder}
                    value={answers[f.id] ?? ""}
                    onChange={(e) => setVal(f.id, e.target.value)}
                    onKeyDown={(e) => {
                      // Ensure Cmd+A/Ctrl+A works for select all
                      if ((e.metaKey || e.ctrlKey) && e.key === 'a') {
                        e.stopPropagation();
                        const target = e.target as HTMLTextAreaElement;
                        target.select();
                        e.preventDefault();
                      }
                    }}
                    rows={Math.max(4, Math.round(fontSize / 5))}
                    disabled={isFieldsDisabled}
                  />
                ) : (
                  <input
                    className={`w-full rounded-lg border border-gray-300 dark:border-gray-600 p-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent text-base ${disabledStyles}`}
                    placeholder={f.placeholder}
                    value={answers[f.id] ?? ""}
                    onChange={(e) => setVal(f.id, e.target.value)}
                    disabled={isFieldsDisabled}
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
                  className={`w-full rounded-lg border border-gray-300 dark:border-gray-600 p-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent text-base ${disabledStyles}`}
                  value={answers[f.id] ?? ""}
                  min={nf.min}
                  max={nf.max}
                  onChange={(e) => setVal(f.id, e.target.valueAsNumber)}
                  disabled={isFieldsDisabled}
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
                  className={`w-full rounded-lg border border-gray-300 dark:border-gray-600 p-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-green-500 focus:border-transparent ${disabledStyles}`}
                  value={answers[f.id] ?? ""}
                  onChange={(e) => setVal(f.id, e.target.value)}
                  disabled={isFieldsDisabled}
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
            const cur: string[] = Array.isArray(answers[f.id]) ? answers[f.id] as string[] : [];
            const toggle = (opt: string) => {
              if (!isFieldsDisabled) {
                const next = cur.includes(opt) ? cur.filter((v) => v !== opt) : [...cur, opt];
                setVal(f.id, next);
              }
            };
            return (
              <div key={f.id} className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200/50 dark:border-gray-700/50 shadow-sm">
                <label className={labelCls}>{f.label}</label>
                <div className="space-y-3">
                  {cf.options.map((opt: string) => (
                    <label key={opt} className={`flex items-center gap-3 p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors ${isFieldsDisabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}>
                      <input
                        type="checkbox"
                        checked={cur.includes(opt)}
                        onChange={() => toggle(opt)}
                        className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500 focus:ring-2"
                        disabled={isFieldsDisabled}
                      />
                      <span className={`text-gray-900 dark:text-gray-100 text-base`}>{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            );
          }
          return null;
        })}
      </div>

      {/* Submit Button */}
      <div className="px-4 pb-4 flex flex-col items-center gap-3">
        {/* Already submitted message */}
        {hasSubmittedBefore && !isEditingNewResponse && (
          <div className="w-full bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-3 text-center">
            <div className="text-green-700 dark:text-green-300 text-sm font-medium flex items-center justify-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              Ya enviaste una respuesta para este formulario
            </div>
            <p className="text-green-600 dark:text-green-400 text-xs mt-1">
              ¿Deseas enviar una nueva respuesta?
            </p>
          </div>
        )}

        {/* Status messages for new submissions */}
        {submitStatus === 'success' && isEditingNewResponse && (
          <div className="text-green-600 dark:text-green-400 text-sm font-medium">
            ✓ Nueva respuesta enviada correctamente
          </div>
        )}
        {submitStatus === 'error' && (
          <div className="text-red-600 dark:text-red-400 text-sm font-medium">
            ✗ {errorMessage}
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-3">
          {hasSubmittedBefore && !isEditingNewResponse ? (
            <button
              onClick={handleNewResponse}
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none text-sm"
            >
              Enviar nueva respuesta
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:outline-none text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Respuestas'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
