import clsx from "clsx";

export function Button({
  className,
  type = "button",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type={type}
      className={clsx(
        "h-10 w-full rounded-lg bg-neutral-900 px-4 text-sm font-medium text-white transition cursor-pointer",
        "hover:bg-neutral-800",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "select-none",
        className,
      )}
      {...props}
    />
  );
}
