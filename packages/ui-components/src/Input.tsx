import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export function Input({ label, error, hint, id, className = "", ...props }: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={[
          "w-full rounded-lg border px-3 py-2 text-sm text-gray-900 placeholder-gray-400",
          "focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent",
          "transition duration-150",
          error ? "border-red-400 bg-red-50" : "border-gray-300 bg-white hover:border-gray-400",
          className,
        ].join(" ")}
        {...props}
      />
      {hint && !error && <p className="text-xs text-gray-500">{hint}</p>}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({ label, error, id, className = "", ...props }: TextareaProps) {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        className={[
          "w-full rounded-lg border px-3 py-2 text-sm text-gray-900 placeholder-gray-400 resize-none",
          "focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent",
          "transition duration-150",
          error ? "border-red-400 bg-red-50" : "border-gray-300 bg-white hover:border-gray-400",
          className,
        ].join(" ")}
        {...props}
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
