export default function Loading() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="h-10 w-48 animate-pulse rounded-md bg-surface-hover" />
      <div className="mt-6 h-36 animate-pulse rounded-lg shadow-[var(--neo-raised-sm)] bg-surface" />
      <div className="mt-6 h-52 animate-pulse rounded-lg shadow-[var(--neo-raised-sm)] bg-surface" />
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="h-72 animate-pulse rounded-lg shadow-[var(--neo-raised-sm)] bg-surface"
          />
        ))}
      </div>
    </div>
  );
}
