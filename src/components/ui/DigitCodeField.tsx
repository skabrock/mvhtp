"use client";

import { useRef } from "react";
import clsx from "clsx";

const LENGTH = 9;

interface DigitCodeFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
}

export function DigitCodeField({
  label,
  value,
  onChange,
  onBlur,
  error,
  required,
  disabled,
}: DigitCodeFieldProps) {
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const digits = value.padEnd(LENGTH, " ").slice(0, LENGTH).split("");

  function setDigit(index: number, digit: string) {
    const next = value.padEnd(LENGTH, " ").split("");
    next[index] = digit;
    onChange(next.join("").replace(/ /g, ""));
  }

  function handleChange(index: number, raw: string) {
    const chars = raw.replace(/\D/g, "");

    if (!chars) {
      setDigit(index, "");
      return;
    }

    if (chars.length > 1) {
      const next = value.split("");
      chars.split("").forEach((char, offset) => {
        if (index + offset < LENGTH) next[index + offset] = char;
      });
      onChange(next.join("").slice(0, LENGTH));
      inputsRef.current[Math.min(index + chars.length, LENGTH - 1)]?.focus();
      return;
    }

    setDigit(index, chars);
    inputsRef.current[index + 1]?.focus();
  }

  function handleKeyDown(
    index: number,
    event: React.KeyboardEvent<HTMLInputElement>,
  ) {
    if (event.key === "Backspace" && !digits[index]?.trim()) {
      event.preventDefault();
      setDigit(index - 1, "");
      inputsRef.current[index - 1]?.focus();
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      inputsRef.current[index - 1]?.focus();
    }

    if (event.key === "ArrowRight") {
      event.preventDefault();
      inputsRef.current[index + 1]?.focus();
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <p className="text-sm font-medium text-neutral-800">
        {label}
        {required ? (
          <span aria-hidden="true" className="text-red-600 select-none">
            {" "}
            *
          </span>
        ) : null}
      </p>
      <div className="flex gap-1">
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(node) => {
              inputsRef.current[index] = node;
            }}
            type="text"
            inputMode="numeric"
            autoComplete="off"
            disabled={disabled}
            aria-label={`${label} digit ${index + 1}`}
            aria-invalid={Boolean(error)}
            value={digit.trim()}
            onChange={(event) => handleChange(index, event.target.value)}
            onKeyDown={(event) => handleKeyDown(index, event)}
            onBlur={onBlur}
            className={clsx(
              "h-10 w-full min-w-0 rounded-lg border bg-white text-center text-sm outline-none transition",
              "border-neutral-300",
              "focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10",
              "disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:opacity-60",
              error &&
                "border-red-500 focus:border-red-500 focus:ring-red-500/15",
            )}
          />
        ))}
      </div>
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
