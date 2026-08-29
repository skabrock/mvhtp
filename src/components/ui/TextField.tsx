import { useId } from "react";
import clsx from "clsx";

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function TextField({
  label,
  error,
  className,
  id,
  ...props
}: TextFieldProps) {
  const inputId = id ?? useId();

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={inputId} className="text-sm font-medium text-neutral-800">
        {label}
      </label>
      <input
        id={inputId}
        aria-invalid={Boolean(error)}
        className={clsx(
          "h-10 w-full rounded-lg border bg-white px-3 text-sm outline-none transition",
          "border-neutral-300 placeholder:text-neutral-400",
          "focus:border-neutral-900 focus:ring-2 focus:ring-neutral-900/10",
          "disabled:cursor-not-allowed disabled:bg-neutral-50 disabled:opacity-60",
          error && "border-red-500 focus:border-red-500 focus:ring-red-500/15",
          className,
        )}
        {...props}
      />
      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
