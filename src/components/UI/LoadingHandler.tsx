type LoadingHandlerProps = {
  text?: string;
};

export default function LoadingHandler({
  text = "Loading...",
}: LoadingHandlerProps) {
  return (
    <div className="flex min-h-[180px] flex-col items-center justify-center gap-3">
      <span
        className="h-10 w-10 animate-spin rounded-full border-4 border-accent/30 border-t-accent"
        aria-hidden="true"
      />
      <p className="text-sm font-medium text-gray-500">{text}</p>
    </div>
  );
}
