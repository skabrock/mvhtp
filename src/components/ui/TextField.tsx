"use client";

import { useId } from "react";
import clsx from "clsx";
import type { TextInputFormat } from "@/lib";

interface TextFieldSlots {
  afterLabel?: React.ReactNode;
}

interface TextFieldProps extends React.ComponentProps<"input"> {
  label: string;
  error?: string;
  formats?: TextInputFormat[];
  slots?: TextFieldSlots;
}

export function TextField({
  label,
  error,
  className,
  id,
  required,
  formats = [],
  slots,
  onChange,
  onBlur,
  ...props
}: TextFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    let value = event.target.value;
    for (const format of formats) {
      value = format(value);
    }

    event.target.value = value;
    onChange?.(event);
  }

  function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    const trimmed = event.target.value.trim();
    if (trimmed !== event.target.value) {
      event.target.value = trimmed;
      onChange?.(event);
    }
    onBlur?.(event);
  }

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1.5">
        <label
          htmlFor={inputId}
          className="text-sm font-medium text-neutral-800"
        >
          {label}
          {required ? (
            <span aria-hidden="true" className="text-red-600 select-none">
              {" "}
              *
            </span>
          ) : null}
        </label>
        {slots?.afterLabel}
      </div>
      <input
        {...props}
        id={inputId}
        required={required}
        aria-invalid={Boolean(error)}
        onChange={handleChange}
        onBlur={handleBlur}
        className={clsx(
          "h-10 w-full rounded-lg border bg-white px-3 text-sm outline-none transition",
          "border-neutral-300 placeholder:text-neutral-400",
          "focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10",
          "disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:opacity-60",
          "placeholder:select-none",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500/15",
          className,
        )}
      />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
