"use client";

import { useId, useState } from "react";
import clsx from "clsx";
import type { InputSanitizer } from "@/lib";

interface TextFieldProps extends React.ComponentProps<"input"> {
  label: string;
  error?: string;
  formats?: InputSanitizer[];
}

export function TextField({
  label,
  error,
  className,
  id,
  required,
  disabled,
  formats,
  maxLength,
  defaultValue,
  onChange,
  onFocus,
  onBlur,
  ...props
}: TextFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const [text, setText] = useState(String(defaultValue ?? ""));
  const [isFocused, setIsFocused] = useState(false);
  const showClear = text.length > 0 && !disabled;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    let value = event.target.value;
    for (const format of formats ?? []) {
      value = format(value, text);
    }
    if (maxLength) value = value.slice(0, Number(maxLength));
    event.target.value = value;
    setText(value);
    onChange?.(event);
  }

  function handleFocus(event: React.FocusEvent<HTMLInputElement>) {
    setIsFocused(true);
    onFocus?.(event);
  }

  function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    const trimmed = event.target.value.trim();
    if (trimmed !== text) {
      event.target.value = trimmed;
      handleChange(event);
    }
    setIsFocused(false);
    onBlur?.(event);
  }

  function handleClear() {
    handleChange?.({
      target: { value: "" },
    } as React.ChangeEvent<HTMLInputElement>);
  }

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={inputId} className="text-sm font-medium text-neutral-800">
        {label}
        {required ? (
          <span aria-hidden="true" className="text-red-600 select-none">
            {" "}
            *
          </span>
        ) : null}
      </label>
      <div className="group relative">
        <input
          {...props}
          id={inputId}
          required={required}
          disabled={disabled}
          maxLength={maxLength}
          value={text}
          aria-invalid={Boolean(error)}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={clsx(
            "h-10 w-full rounded-lg border bg-white px-3 text-sm outline-none transition",
            "border-neutral-300 placeholder:text-neutral-400",
            "focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10",
            "disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:opacity-60",
            "placeholder:select-none",
            showClear && "pr-9",
            error &&
              "border-red-500 focus:border-red-500 focus:ring-red-500/15",
            className,
          )}
        />
        {showClear ? (
          <button
            type="button"
            tabIndex={-1}
            aria-label={`Clear ${label}`}
            onMouseDown={(event) => event.preventDefault()}
            onClick={handleClear}
            className={clsx(
              "absolute top-1/2 right-2 flex size-6 -translate-y-1/2 cursor-pointer items-center justify-center rounded text-lg leading-none text-neutral-400 select-none hover:text-neutral-700",
              isFocused ? "opacity-100" : "opacity-0 group-hover:opacity-100",
            )}
          >
            ×
          </button>
        ) : null}
      </div>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
