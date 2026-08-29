import clsx from "clsx";
import { Check, Loader2, X } from "lucide-react";

interface CorpNumStatusProps {
  isFetching: boolean;
  isSuccess: boolean;
  isError: boolean;
}

export function CorpNumStatus({
  isFetching,
  isSuccess,
  isError,
}: CorpNumStatusProps) {
  const visible = isFetching || isSuccess || isError;

  return (
    <span
      role="status"
      aria-hidden={!visible}
      className={clsx(
        "inline-flex size-4 items-center justify-center transition duration-200 ease-out",
        visible ? "scale-100 opacity-100" : "scale-50 opacity-0",
      )}
    >
      {isFetching ? (
        <Loader2 className="size-3.5 animate-spin text-neutral-700" />
      ) : isSuccess ? (
        <Check className="size-4 text-green-600" />
      ) : isError ? (
        <X className="size-4 text-red-600" />
      ) : null}
    </span>
  );
}
