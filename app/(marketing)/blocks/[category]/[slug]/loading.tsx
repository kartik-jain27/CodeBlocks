export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="h-5 w-72 animate-pulse rounded-md bg-surface-hover" />
      <div className="mt-8 h-12 max-w-lg animate-pulse rounded-md bg-surface-hover" />
      <div className="mt-3 h-6 max-w-2xl animate-pulse rounded-md bg-surface-hover" />
      <div className="mt-8 h-[680px] animate-pulse rounded-lg shadow-[var(--neo-raised-sm)] bg-surface" />
      <div className="mt-6 h-14 animate-pulse rounded-lg shadow-[var(--neo-raised-sm)] bg-surface" />
    </div>
  );
}
