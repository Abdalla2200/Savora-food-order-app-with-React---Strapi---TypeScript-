type ErrorHandlerProps = {
  message?: string;
  onRetry?: () => void;
};

export default function ErrorHandler({
  message = "Something went wrong. Please try again.",
  onRetry,
}: ErrorHandlerProps) {
  return (
    <div
      className="flex min-h-[180px] flex-col items-center justify-center gap-3 rounded-xl border border-red-200 bg-red-50 p-6 text-center"
      role="alert"
    >
      <p className="font-semibold text-red-700">Failed to load data</p>
      <p className="text-sm text-red-600">{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-1 rounded-full bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          Try again
        </button>
      ) : null}
    </div>
  );
}
